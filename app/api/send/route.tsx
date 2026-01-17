import { Resend } from 'resend';
import { EmailTemplate } from '@/app/component/email_template';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {


  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <michealokosun6@gmail.com>',
      to: ['delivered@resend.dev'],
      subject: 'Booking successful',
      react: <EmailTemplate firstName="jogn" />,
    });

    if (error) {
        console.log("Error sending email:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}