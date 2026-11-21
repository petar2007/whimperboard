import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase admin klijent (koristi service_role ključ da zaobiđe row-level security i upiše u bazu)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const eventData = JSON.parse(rawBody);

    const eventType = eventData.event_type;
    const data = eventData.data;

    console.log('Paddle Webhook received:', eventType);

    // Gledamo da li je pretplata aktivirana, kreirana ili ažurirana
    if (
      eventType === 'subscription.created' ||
      eventType === 'subscription.activated' ||
      eventType === 'subscription.updated'
    ) {
      const customData = data?.custom_data;
      const userId = customData?.user_id;
      const status = data?.status; // 'active', 'trialing', 'canceled', itd.

      if (userId) {
        const subscriptionId =
          typeof eventType === 'string' && eventType.startsWith('subscription.')
            ? data?.id
            : null;

        const isPro = status === 'active' || status === 'trialing';

        const { data: existingRow, error: selectError } = await supabaseAdmin
          .from('user_boxes')
          .select('user_id')
          .eq('user_id', userId)
          .maybeSingle();

        if (selectError) {
          console.error('Error checking user_boxes row:', selectError.message);
          return NextResponse.json({ error: selectError.message }, { status: 500 });
        }

        if (existingRow) {
          const updatePayload = {
            is_pro: isPro,
          };

          if (subscriptionId) {
            updatePayload.paddle_subscription_id = subscriptionId;
          }

          const { error: updateError } = await supabaseAdmin
            .from('user_boxes')
            .update(updatePayload)
            .eq('user_id', userId);

          if (updateError) {
            console.error('Error updating user_boxes:', updateError.message);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
          }
        } else {
          const insertPayload = {
            user_id: userId,
            is_pro: isPro,
            boxes_data: [],
          };

          if (subscriptionId) {
            insertPayload.paddle_subscription_id = subscriptionId;
          }

          const { error: insertError } = await supabaseAdmin
            .from('user_boxes')
            .insert(insertPayload);

          if (insertError) {
            console.error('Error inserting into user_boxes:', insertError.message);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
          }
        }
      }
    } else if (eventType === 'subscription.canceled') {
      const customData = data?.custom_data;
      const userId = customData?.user_id;

      if (userId) {
        const { data: existingRow, error: selectError } = await supabaseAdmin
          .from('user_boxes')
          .select('user_id')
          .eq('user_id', userId)
          .maybeSingle();

        if (selectError) {
          console.error('Error checking user_boxes on cancel:', selectError.message);
          return NextResponse.json({ error: selectError.message }, { status: 500 });
        }

        if (existingRow) {
          const { error: updateError } = await supabaseAdmin
            .from('user_boxes')
            .update({ is_pro: false })
            .eq('user_id', userId);

          if (updateError) {
            console.error('Error canceling Pro status:', updateError.message);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}