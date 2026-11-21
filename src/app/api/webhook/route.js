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
      const customData = data.custom_data;
      const userId = customData?.user_id; // Ovde hvatamo user_id koji smo poslali iz frontenda
      const status = data.status; // 'active', 'trialing', 'canceled', itd.

      if (userId) {
        const subscriptionId =
  typeof eventType === 'string' && eventType.startsWith('subscription.')
    ? data?.id
    : null;

const isPro = status === 'active' || status === 'trialing';

// Ako je pretplata otkazana, ne pravi novi red ako korisnik više ne postoji u bazi
if (eventType === 'subscription.canceled') {
  const { data: existingRow } = await supabaseAdmin
    .from('user_boxes')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (!existingRow) {
    return NextResponse.json({ received: true });
  }
}

const rowToSave = {
  user_id: userId,
  is_pro: isPro,
  boxes_data: [],
};

if (subscriptionId) {
  rowToSave.paddle_subscription_id = subscriptionId;
}

const { error } = await supabaseAdmin
          .from('user_boxes')
          .upsert(rowToSave, { onConflict: 'user_id' });

        if (error) {
          console.error('Error writing to the Supabase database:', error.message);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }
    } else if (eventType === 'subscription.canceled') {
      const customData = data?.custom_data;
      const userId = customData?.user_id;

      if (userId) {
        const { data: existingRow } = await supabaseAdmin
          .from('user_boxes')
          .select('user_id')
          .eq('user_id', userId)
          .maybeSingle();

        if (existingRow) {
          const { error } = await supabaseAdmin
            .from('user_boxes')
            .update({ is_pro: false })
            .eq('user_id', userId);

          if (error) {
            console.error('Error canceling Pro status:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
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