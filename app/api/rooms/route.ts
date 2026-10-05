import { NextResponse } from "next/server";
import { getRooms } from "@/actions/rooms";

export async function GET() {
  try {
    const result = await getRooms();
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch rooms";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
