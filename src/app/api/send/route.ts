import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO || "mathiasfoght98@gmail.com";

    if (!from) {
      return NextResponse.json(
        { error: "Missing RESEND_FROM configuration." },
        { status: 500 },
      );
    }

    const safeName = escapeHtml(body.name);
    const safeEmail = escapeHtml(body.email);
    const safePhone = escapeHtml(body.phone || "-");
    const safeMessage = escapeHtml(body.message);

    const html = `
      <div style="margin:0;padding:0;background:#f2f5f8;">
        <div style="max-width:600px;margin:0 auto;padding:28px 20px 36px;">
          <div style="background:#ffffff;border-radius:12px;padding:24px 24px 20px;border:1px solid rgba(0,0,0,0.06);">
            <div style="font-family:Arial, sans-serif;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#5a5a5a;">
              New portfolio inquiry
            </div>
            <div style="height:1px;background:rgba(0,0,0,0.08);margin:16px 0 18px;"></div>

            <table style="width:100%;border-collapse:collapse;font-family:Arial, sans-serif;color:#121212;">
              <tr>
                <td style="padding:6px 0;width:120px;color:#5a5a5a;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Name</td>
                <td style="padding:6px 0;font-size:15px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#5a5a5a;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Email</td>
                <td style="padding:6px 0;font-size:15px;">
                  <a href="mailto:${safeEmail}" style="color:#2067ff;text-decoration:none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#5a5a5a;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;">Phone</td>
                <td style="padding:6px 0;font-size:15px;">${safePhone}</td>
              </tr>
            </table>

            <div style="margin-top:18px;border:1px solid rgba(0,0,0,0.08);background:#f7f7f7;border-radius:10px;padding:16px;">
              <div style="font-family:Arial, sans-serif;color:#5a5a5a;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px;">
                Message
              </div>
              <div style="font-family:Arial, sans-serif;color:#121212;font-size:14px;line-height:1.5;white-space:pre-wrap;">
                ${safeMessage}
              </div>
            </div>

            <div style="margin-top:18px;font-family:Arial, sans-serif;color:#5a5a5a;font-size:12px;">
              Sent from <a href="https://mathiasfoght.com" style="color:#2067ff;text-decoration:none;">mathiasfoght.com</a>
            </div>
          </div>
        </div>
      </div>
    `;

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
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
