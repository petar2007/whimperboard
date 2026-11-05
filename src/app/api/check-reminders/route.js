import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ success: false, error: 'Missing environment variables' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    const { data: userBoxesList, error } = await supabaseAdmin
      .from('user_boxes')
      .select('*');

    if (error) throw error;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let emailsSent = 0;

    for (const item of userBoxesList) {
      const boxes = item.boxes_data;
      let updated = false;

      if (!Array.isArray(boxes)) continue;

      for (const box of boxes) {
        // Prioritet vremenske zone: 1. Zona boksa -> 2. Rezervna zona
        const targetZone = box.timeZone || 'Europe/Belgrade';

        // Računanje trenutnog datuma i vremena ZA ZONU TVOG BOKSA
        const localNowStr = new Date().toLocaleString('en-US', { timeZone: targetZone });
        const localDateObj = new Date(localNowStr);

        const currentDate = localDateObj.toISOString().split('T')[0];
        const currentTime = localDateObj.toTimeString().slice(0, 5);

        if (box.pet && Array.isArray(box.pet.reminders)) {
          for (const reminder of box.pet.reminders) {
            if (
              reminder.date === currentDate &&
              reminder.time === currentTime &&
              !reminder.sent
            ) {
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `🚨 Whimperboard ALARM: ${box.name} - ${box.pet.dogName}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px; border: 2px solid #18181b; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #18181b; margin-top: 0;">Whimperboard Scheduled Reminder</h2>
                    <p><strong>Box:</strong> ${box.name}</p>
                    <p><strong>Dog Name:</strong> ${box.pet.dogName}</p>
                    <p><strong>Reminder Note:</strong> ${reminder.text}</p>
                    <p><strong>Owner Phone:</strong> ${box.pet.ownerPhone || 'N/A'}</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;" />
                    <p style="color: #10b981; font-weight: bold; margin-bottom: 0;">Triggered for zone: ${targetZone} (${currentDate} at ${currentTime})</p>
                  </div>
                `,
              };

              await transporter.sendMail(mailOptions);

              reminder.sent = true;
              updated = true;
              emailsSent++;
            }
          }
        }
      }

      if (updated) {
        await supabaseAdmin
          .from('user_boxes')
          .update({ boxes_data: boxes })
          .eq('id', item.id);
      }
    }

    return NextResponse.json({ success: true, emailsSent });
  } catch (err) {
    console.error('Cron check error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}