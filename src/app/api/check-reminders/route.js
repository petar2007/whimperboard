import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export async function GET(request) {
  try {
    // Inicijalizujemo Supabase admin klijent unutar funkcije
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ success: false, error: 'Missing Supabase environment variables' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Format YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5); // Format HH:MM

    // 1. Povlačimo sve bokseve iz baze
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

    // 2. Prolazimo kroz svaki nalog i njegove bokseve/podsetnike
    for (const item of userBoxesList) {
      const boxes = item.boxes_data;
      let updated = false;

      for (const box of boxes) {
        if (box.pet && box.pet.reminders) {
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
                  <div style="font-family: sans-serif; padding: 20px; border: 2px solid #18181b; border-radius: 12px;">
                    <h2 style="color: #18181b;">Whimperboard Scheduled Reminder</h2>
                    <p><strong>Box:</strong> ${box.name}</p>
                    <p><strong>Dog Name:</strong> ${box.pet.dogName}</p>
                    <p><strong>Reminder Note:</strong> ${reminder.text}</p>
                    <p><strong>Owner Phone:</strong> ${box.pet.ownerPhone || 'N/A'}</p>
                    <p style="color: #10b981; font-weight: bold;">Scheduled time: ${reminder.date} at ${reminder.time}</p>
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