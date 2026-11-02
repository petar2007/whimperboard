import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { boxName, dogName, reminderText, ownerPhone } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Šalje obaveštenje pansionu na njegov mejl
      subject: `🚨 Whimperboard Alert: ${boxName} - ${dogName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #18181b; border-radius: 12px;">
          <h2 style="color: #18181b; margin-bottom: 16px;">Whimperboard Reminder</h2>
          <p><strong>Box:</strong> ${boxName}</p>
          <p><strong>Dog Name:</strong> ${dogName}</p>
          <p><strong>Reminder Note:</strong> ${reminderText}</p>
          <p><strong>Owner Phone:</strong> ${ownerPhone || 'N/A'}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}