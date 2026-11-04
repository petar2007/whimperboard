import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ 
        success: false, 
        error: `Missing env vars: URL=${!!supabaseUrl}, KEY=${!!serviceKey}` 
      }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Testiramo čitanje iz baze
    const { data, error } = await supabaseAdmin
      .from('user_boxes')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json({ success: false, error: 'Supabase Error: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Connection works!', sampleData: data });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Catch Error: ' + err.message }, { status: 500 });
  }
}