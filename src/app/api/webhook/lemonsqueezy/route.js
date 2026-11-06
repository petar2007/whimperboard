import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Inicijalizacija Supabase-a sa Service Role ključem za administrativni pristup bazi
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const hmac = crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '');
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(req.headers.get('x-signature') || '', 'utf8');

    // 1. Verifikacija potpusa da bismo bili 100% sigurni da zahtev šalje Lemon Squeezy
    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const customData = payload.meta.custom_data;
    const userId = customData?.user_id;

    // Ako u uplaćenim podacima nema user_id, ignorišemo zahtev
    if (!userId) {
      return NextResponse.json({ message: 'No user_id provided in custom metadata' }, { status: 200 });
    }

    const subscriptionStatus = payload.data.attributes.status; // npr. 'active', 'on_trial', 'cancelled', 'expired'
    const customerId = payload.data.attributes.customer_id;

    // 2. Proveravamo da li je status aktivan ili u probnom periodu (trial)
    const isPro = subscriptionStatus === 'active' || subscriptionStatus === 'on_trial';

    // 3. Ažuriramo `user_boxes` tabelu u Supabase-u za datog korisnika
    const { error } = await supabaseAdmin
      .from('user_boxes')
      .update({
        is_pro: isPro,
        lemon_customer_id: String(customerId),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}