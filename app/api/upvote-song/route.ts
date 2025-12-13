import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { songId, guestId } = body;

    // check for missing info
    if (!songId || !guestId) {
      return NextResponse.json(
        { error: "missing songId or guestId" },
        { status: 400 }
      );
    }

    //  insert vote (fails if already voted due to unique constraint)
    const { error: voteError } = await supabase
      .from("votes")
      .insert([{ song_id: songId, guest_id: guestId }]);

    // if the user already voted (Postgres error code 23505)
    if (voteError && voteError.code === "23505") {
      return NextResponse.json(
        { error: "you already voted for this song" },
        { status: 403 }
      );
    }

    // NEW: foreign key error = song no longer exists (host removed it)
    if (voteError && voteError.code === "23503") {
      return NextResponse.json(
        { error: "This song has been removed by the host." },
        { status: 400 }
      );
    }

    // handle unexpected vote error
    if (voteError) {
      return NextResponse.json(
        { error: voteError.message },
        { status: 500 }
      );
    }

    // increment vote count using function on SQL
    const { error: rpcError } = await supabase.rpc(
      "increment_song_votes",
      { song: songId }
    );

    if (rpcError) {
      return NextResponse.json(
        { error: rpcError.message },
        { status: 500 }
      );
    }

    // everything worked
    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
