import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Provera identiteta preko Bearer tokena (da niko ne može da obriše tuđ nalog)
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const userId = user.id;
    const userEmail = user.email;

    // 2. Uzmi sačuvani paddle_subscription_id iz user_boxes
    const { data: userRow } = await supabaseAdmin
      .from('user_boxes')
      .select('paddle_subscription_id')
      .eq('user_id', userId)
      .maybeSingle();

    const paddleBaseUrl =
      process.env.NEXT_PUBLIC_PADDLE_ENV === 'production'
        ? 'https://api.paddle.com'
        : 'https://sandbox-api.paddle.com';

    const paddleHeaders = {
      Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Prikupi sve pretplate za otkazivanje (iz baze + fallback pretraga po mejlu u Paddle-u)
    const subIdsToCancel = new Set();
    if (userRow?.paddle_subscription_id) {
      subIdsToCancel.add(userRow.paddle_subscription_id);
    }

    if (userEmail && process.env.PADDLE_API_KEY) {
      const custRes = await fetch(
        `${paddleBaseUrl}/customers?email=${encodeURIComponent(userEmail)}`,
        { headers: paddleHeaders }
      );
      const custData = await custRes.json().catch(() => ({}));
      const customers = custData?.data || [];

      for (const cust of customers) {
        const subsRes = await fetch(
          `${paddleBaseUrl}/subscriptions?customer_id=${cust.id}&status=active,trialing,past_due,paused`,
          { headers: paddleHeaders }
        );
        const subsData = await subsRes.json().catch(() => ({}));
        for (const sub of subsData?.data || []) {
          subIdsToCancel.add(sub.id);
        }
      }
    }

    // 3. Otkaži svaku pronađenu aktivnu/trialing pretplatu ODMAH na Paddle-u
    for (const subId of subIdsToCancel) {
      const paddleRes = await fetch(
        `${paddleBaseUrl}/subscriptions/${subId}/cancel`,
        {
          method: 'POST',
          headers: paddleHeaders,
          body: JSON.stringify({ effective_from: 'immediately' }),
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

    // 4. Brišemo sve podatke korisnika iz svih tabela u Supabase-u
    // (Dodaj ovde i druge tabele ako imaš odvojenu tabelu za customers ili podsetnike)
    const { error: deleteBoxesError } = await supabaseAdmin
      .from('user_boxes')
      .delete()
      .eq('user_id', userId);

    if (deleteBoxesError) {
      return NextResponse.json(
        { error: deleteBoxesError.message },
        { status: 500 }
      );
    }

    // 5. Trajno brišemo korisnika iz Supabase Auth sistema (auth.users)
    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      return NextResponse.json(
        { error: deleteUserError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account and subscription permanently deleted.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}