import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      partner_1_name,
      partner_2_name,
      event_date,
      location,
      event_types,
      guest_count,
      package_level,
      whatsapp_number,
    } = body;

    // Clean up phone number for WhatsApp link (remove spaces, pluses, etc.)
    const cleanPhone = whatsapp_number.replace(/\D/g, "");

    // 1. Send Welcome Email to Client
    await resend.emails.send({
      from: "Wesleyshotit <hello@resend.dev>", // Replace with your verified domain
      to: [email],
      subject: "Thank you for booking with Wesleyshotit! 📸",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #212922;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            <h1 style="text-transform: uppercase; letter-spacing: 0.2em; font-weight: 300; margin: 0;">Wesleyshotit</h1>
            <img src="https://yourwebsite.com/logo.PNG" alt="Wesleyshotit Logo" style="height: 40px; width: auto;" />
          </div>
          <p style="font-size: 16px; line-height: 1.6; mt-4">Hi ${partner_1_name},</p>
          <p style="font-size: 16px; line-height: 1.6;">Thank you for booking with us! We are thrilled to help you capture your beautiful story with ${partner_2_name}.</p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #5B8266;">
            <p style="font-size: 16px; line-height: 1.6; margin: 0;"><strong>Important Notice:</strong> Your booking is currently pending. Please note that <strong>payment validates booking</strong>. Kindly make your payment to secure your date.</p>
          </div>

          <p style="font-size: 14px; color: #666;">The team will get back to you as soon as possible via WhatsApp within 24 hours to discuss your booking details and provide payment instructions.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center; text-transform: uppercase; letter-spacing: 0.1em;">Wesleyshotit | Benin City, Nigeria</p>
        </div>
      `,
    });

    // 2. Send Notification Email to Photographer (Your Client)
    const { data, error } = await resend.emails.send({
      from: "Wesleyshotit <hello@resend.dev>",
      to: ["bookings@wesleyshotit.com"], // <-- REPLACE THIS WITH YOUR CLIENT'S EMAIL
      subject: `New Booking Request: ${partner_1_name} & ${partner_2_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #212922;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            <h1 style="text-transform: uppercase; letter-spacing: 0.2em; font-weight: 300; margin: 0;">New Booking Request</h1>
            <img src="https://yourwebsite.com/logo.PNG" alt="Wesleyshotit Logo" style="height: 40px; width: auto;" />
          </div>
          <p style="font-size: 16px; line-height: 1.6; mt-4">You have received a new booking request. Here are the details:</p>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #5B8266;">
            <p style="margin: 5px 0;"><strong>Couple:</strong> ${partner_1_name} & ${partner_2_name}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${event_date}</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
            <p style="margin: 5px 0;"><strong>Event Types:</strong> ${Array.isArray(event_types) ? event_types.join(", ") : event_types}</p>
            <p style="margin: 5px 0;"><strong>Guest Count:</strong> ${guest_count}</p>
            <p style="margin: 5px 0;"><strong>Package:</strong> ${package_level}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${whatsapp_number}</p>
          </div>

          <div style="margin: 30px 0; text-align: center;">
            <a href="https://wa.me/${cleanPhone}" style="background-color: #25D366; color: white; padding: 15px 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; font-weight: bold; border-radius: 4px;">Message on WhatsApp</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center; text-transform: uppercase; letter-spacing: 0.1em;">Wesleyshotit Notification System</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
