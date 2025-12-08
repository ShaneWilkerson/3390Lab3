import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// this file runs when a guest requests a song
export async function POST(req: Request) {
  try {
    // get info from the body
    const body = await req.json();
    const { title, artist, eventId, guestId } = body;

    // basic checks
    if (!title || !eventId || !guestId) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }

    // insert the new song into supabase
    const { data, error } = await supabase
      .from("songs")
      .insert([
        {
          title,
          artist: artist || null,
          event_id: eventId,
          added_by_guest_id: guestId,
          votes: 0,
          status: "pending"
        }
      ])
      .select()
      .single();

    // error inserting
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // success
    return NextResponse.json({ song: data }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
