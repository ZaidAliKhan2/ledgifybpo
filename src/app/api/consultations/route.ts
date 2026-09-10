import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { consultations } from "@/db/schema";
import { services } from "@/lib/content";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin && new URL(origin).host !== request.headers.get("host") && new URL(origin).host !== request.headers.get("x-forwarded-host")) {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }
  try {
    const data = await request.json();
    if (data.website) return NextResponse.json({ success: true });
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const company = typeof data.company === "string" ? data.company.trim() : "";
    const service = typeof data.service === "string" ? data.service.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !company || company.length > 160 || !services.some(s => s.name === service) || message.length > 3000) {
      return NextResponse.json({ error: "Please enter a valid name, work email, company, and service." }, { status: 400 });
    }
    await db.insert(consultations).values({ name, email, company, service, message });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    console.error("Consultation request failed", error);
    return NextResponse.json({ error: "Your request could not be saved. Please try again." }, { status: 500 });
  }
}
