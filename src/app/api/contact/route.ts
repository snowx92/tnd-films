import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { inquiryLabel, parseContactPayload } from "@/lib/inquiry";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "That did not parse." },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body);

  if (parsed === "ignored") {
    return NextResponse.json({ ok: true });
  }

  if (typeof parsed === "string") {
    return NextResponse.json({ ok: false, error: parsed }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (key && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: parsed.email,
        subject: `New brief: ${parsed.name} / ${inquiryLabel(parsed.vertical)}`,
        text: [
          `Name: ${parsed.name}`,
          `Email: ${parsed.email}`,
          `Company: ${parsed.company || "—"}`,
          `Vertical: ${inquiryLabel(parsed.vertical)}`,
          "",
          parsed.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Mail did not leave the house. Write us directly." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
