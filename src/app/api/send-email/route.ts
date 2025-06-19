import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/components/emails/ContactFormEmail';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

if (!resendApiKey) {
  console.error('RESEND_API_KEY is not set in the environment variables.');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: NextRequest) {
  if (!resend) {
    return NextResponse.json({ error: 'Email server is not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!toEmail) {
      console.error('Recipient email (NEXT_PUBLIC_CONTACT_EMAIL) is not configured.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Luxury Machines <onboarding@resend.dev>', // IMPORTANT: Change to your verified Resend domain
      to: [toEmail],
      subject: `New Inquiry from ${firstName} ${lastName}`,
      react: await ContactFormEmail({ firstName, lastName, email, phone, message }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
