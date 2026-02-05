import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO || "mathiasfoght98@gmail.com";

    if (!from) {
      return NextResponse.json(
        { error: "Missing RESEND_FROM configuration." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `Portfolio contact from ${body.name}`,
      text:
        `Name: ${body.name}\n` +
        `Email: ${body.email}\n` +
        `Phone: ${body.phone || "-"}\n\n` +
        `${body.message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
