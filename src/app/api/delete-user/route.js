import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // 1. Uzmi sačuvani paddle_subscription_id pre brisanja reda
    const { data: userRow } = await supabaseAdmin
      .from('user_boxes')
      .select('paddle_subscription_id')
      .eq('user_id', userId)
      .maybeSingle();

    // 2. Ako korisnik ima pretplatu, otkaži je ODMAH na Paddle-u
    if (userRow?.paddle_subscription_id) {
      const paddleBaseUrl =
        process.env.NEXT_PUBLIC_PADDLE_ENV === 'production'
          ? 'https://api.paddle.com'
          : 'https://sandbox-api.paddle.com';

      const paddleRes = await fetch(
        `${paddleBaseUrl}/subscriptions/${userRow.paddle_subscription_id}/cancel`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            effective_from: 'immediately',
          }),
        }
      );

      const paddleData = await paddleRes.json().catch(() => ({}));
      const alreadyCanceled = JSON.stringify(paddleData)
        .toLowerCase()
        .includes('canceled');

      if (!paddleRes.ok && !alreadyCanceled) {
        return NextResponse.json(
          { error: 'Failed to cancel Paddle subscription' },
          { status: 502 }
        );
      }
    }

    // 3. Brišemo podatke iz user_boxes tabele
    await supabaseAdmin.from('user_boxes').delete().eq('user_id', userId);

    // 4. Trajno brišemo korisnika iz Supabase Auth sistema
    const { error: deleteError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account completely deleted.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}