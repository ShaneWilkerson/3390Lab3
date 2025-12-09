import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// deletes a song using its id
export async function POST(req: Request) {
  try {
    const { songId } = await req.json();

    // simple check for missing input
    if (!songId) {
      return NextResponse.json(
        { error: "missing song id" },
        { status: 400 }
      );
    }

    // delete the song in supabase
    const { error } = await supabase
      .from("songs")
      .delete()
      .eq("id", songId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
