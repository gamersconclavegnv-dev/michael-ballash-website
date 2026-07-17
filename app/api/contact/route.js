import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  const { mode, name, email, phone, date, location, guests, occasion, piece, message } = body;

  if (!name || !email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }

  const subject =
    mode === "dinner"
      ? `Dinner inquiry — ${name}`
      : `Painting inquiry — ${piece || "unspecified piece"} — ${name}`;

  const lines =
    mode === "dinner"
      ? [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Date: ${date || "—"}`,
          `Location: ${location || "—"}`,
          `Guests: ${guests || "—"}`,
          `Occasion: ${occasion || "—"}`,
          `Message: ${message || "—"}`,
        ]
      : [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Piece: ${piece || "—"}`,
          `Message: ${message || "—"}`,
        ];

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject,
      text: lines.join("\n"),
    });

    // Best-effort log to Supabase — don't fail the request if this errors
    try {
      const db = supabaseAdmin();
      await db.from("inquiries").insert({
        mode,
        name,
        email,
        phone,
        date,
        location,
        guests,
        occasion,
        piece,
        message,
      });
    } catch (logErr) {
      console.error("Inquiry logging failed:", logErr);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return Response.json({ error: "Failed to send." }, { status: 500 });
  }
}
