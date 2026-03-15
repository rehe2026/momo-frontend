import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const validCode = process.env.ACCESS_CODE || "momo2026";

    return NextResponse.json({
      valid: code === validCode,
    });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
