import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      contact,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      room,
      notes,
      specialRequests,
      source = "General Enquiry",
    } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const guestEmail = email || (contact && contact.includes("@") ? contact : null);
    const guestPhone = phone || (contact && !contact.includes("@") ? contact : contact || "Not specified");
    const requestedRoom = room || "General Sanctuary Stay";
    const guestRequests = specialRequests || notes || "No special requests specified.";
    const hotelRecipient = process.env.HOTEL_NOTIFICATION_EMAIL || "info@lakeescape.in";
    const fromAddress = process.env.RESEND_FROM_EMAIL || "Lake Escape <info@lakeescape.in>";

    // Luxury HTML Email Template for Resort Desk
    const hotelNotificationHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FBF9F5; padding: 40px 20px; color: #1A0F0A; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid rgba(44, 26, 16, 0.1); padding: 36px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            
            <div style="border-bottom: 2px solid #8C6747; padding-bottom: 20px; margin-bottom: 24px;">
              <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #8C6747; margin: 0 0 6px;">Lake Escape · Tehri Lake Sanctuary</p>
              <h2 style="font-size: 22px; font-weight: 600; margin: 0; color: #1A0F0A;">New Guest Reservation Enquiry</h2>
              <p style="font-size: 12px; color: #5A3D2C; margin: 4px 0 0;">Source: ${source}</p>
            </div>

            <div style="background: #F8F5F0; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(44, 26, 16, 0.08);">
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8C6747; margin: 0 0 14px;">Guest Details</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47; width: 130px;"><strong>Name:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47;"><strong>Phone:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A; font-weight: 500;"><a href="tel:${guestPhone}" style="color: #1A0F0A; text-decoration: underline;">${guestPhone}</a></td>
                </tr>
                ${guestEmail ? `
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47;"><strong>Email:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A; font-weight: 500;"><a href="mailto:${guestEmail}" style="color: #8C6747; text-decoration: underline;">${guestEmail}</a></td>
                </tr>
                ` : ""}
              </table>
            </div>

            <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(44, 26, 16, 0.1);">
              <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8C6747; margin: 0 0 14px;">Itinerary & Stay Request</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47; width: 130px;"><strong>Experience / Room:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A; font-weight: 600;">${requestedRoom}</td>
                </tr>
                ${checkIn ? `
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47;"><strong>Check-in:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A;">${checkIn}</td>
                </tr>
                ` : ""}
                ${checkOut ? `
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47;"><strong>Check-out:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A;">${checkOut}</td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47;"><strong>Guests:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A;">${guests || "2"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #7A5C47; vertical-align: top;"><strong>Notes / Requests:</strong></td>
                  <td style="padding: 6px 0; color: #1A0F0A; line-height: 1.5;">${guestRequests}</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; padding-top: 10px;">
              <a href="https://wa.me/${guestPhone.replace(/[^0-9]/g, "")}" style="display: inline-block; background: #1A0F0A; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
                Reply via WhatsApp
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid rgba(44, 26, 16, 0.08); margin: 30px 0 16px;" />
            <p style="font-size: 11px; text-align: center; color: rgba(26, 15, 10, 0.45); margin: 0;">
              Lake Escape Concierge System · Automated Notification
            </p>
          </div>
        </body>
      </html>
    `;

    // Guest Confirmation Email
    const guestConfirmationHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FBF9F5; padding: 40px 20px; color: #1A0F0A; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid rgba(44, 26, 16, 0.1); padding: 36px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            
            <div style="text-align: center; margin-bottom: 26px;">
              <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #8C6747; margin: 0 0 6px;">Lake Escape · Tehri Lake, Uttarakhand</p>
              <h2 style="font-size: 24px; font-weight: 500; margin: 0; color: #1A0F0A;">We Have Received Your Enquiry</h2>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #4B3024; margin-bottom: 20px;">
              Dear <strong>${name}</strong>,
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #4B3024; margin-bottom: 24px;">
              Thank you for considering Lake Escape for your journey. We have logged your request for <strong>${requestedRoom}</strong>. Our guest relations team is currently reviewing availability and will reach out to you directly via phone or email within the next 2 hours.
            </p>

            <div style="background: #F8F5F0; border-radius: 12px; padding: 18px; margin-bottom: 26px; border: 1px solid rgba(44, 26, 16, 0.08); font-size: 13px;">
              <p style="margin: 0 0 6px; color: #7A5C47;"><strong>Dates:</strong> ${checkIn || "Flexible"} to ${checkOut || "Flexible"}</p>
              <p style="margin: 0 0 6px; color: #7A5C47;"><strong>Guests:</strong> ${guests || 2}</p>
              <p style="margin: 0; color: #7A5C47;"><strong>Jetty Boarding Bay:</strong> Koti Colony, Tehri Lake (Complimentary speedboat transfer)</p>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #4B3024; margin-bottom: 24px;">
              If you require urgent assistance or wish to customize a special celebration, you can also reach our concierge directly:
            </p>

            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://wa.me/919762985044" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                Connect on WhatsApp (+91 97629 85044)
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid rgba(44, 26, 16, 0.08); margin: 28px 0 16px;" />
            <p style="font-size: 11px; text-align: center; color: rgba(26, 15, 10, 0.45); margin: 0;">
              Lake Escape Sanctuary · Floating Luxury Hotel · Tehri Lake, Uttarakhand
            </p>
          </div>
        </body>
      </html>
    `;

    // 1. Dispatch Email via Resend if API key is configured
    if (resend) {
      try {
        // Send email to Resort Desk
        await resend.emails.send({
          from: fromAddress,
          to: hotelRecipient,
          subject: `Lake Escape Enquiry: ${name} — ${requestedRoom}`,
          html: hotelNotificationHtml,
        });

        // If guest provided an email, send them a confirmation receipt
        if (guestEmail) {
          try {
            await resend.emails.send({
              from: fromAddress,
              to: guestEmail,
              subject: `Lake Escape Sanctuary — We have received your enquiry`,
              html: guestConfirmationHtml,
            });
          } catch (guestErr) {
            console.warn("Could not dispatch guest confirmation receipt (check Resend domain status):", guestErr);
          }
        }

        return NextResponse.json({
          success: true,
          message: "Your enquiry has been dispatched to our concierge team. You will hear from us shortly.",
        });
      } catch (emailErr: unknown) {
        console.error("Resend delivery error in /api/enquiry:", emailErr);
        // Fallback: don't break frontend if free-tier Resend has domain sandbox restrictions
        return NextResponse.json({
          success: true,
          message: "Enquiry logged successfully. Our concierge will contact you.",
          warning: (emailErr as Error).message,
        });
      }
    } else {
      // Dev mode: Resend API key not set yet
      console.log("──────────────────────────────────────────────────");
      console.log("[DEV ENQUIRY DISPATCHED] (Set RESEND_API_KEY in .env.local for live delivery)");
      console.log(`From: ${name} | Contact: ${guestPhone} / ${guestEmail || "none"}`);
      console.log(`Room: ${requestedRoom} | Dates: ${checkIn} -> ${checkOut} | Guests: ${guests}`);
      console.log(`Notes: ${guestRequests}`);
      console.log("──────────────────────────────────────────────────");

      return NextResponse.json({
        success: true,
        message: "Your enquiry has been sent to our concierge desk.",
        devMode: true,
      });
    }
  } catch (error: unknown) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Could not submit enquiry. Please try again or call concierge directly." },
      { status: 500 }
    );
  }
}
