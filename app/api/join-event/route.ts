import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// functon for join event
export async function POST(req: Request) {
  try {
    // uses name and code that was typed
    const body = await req.json();
    const { name, code } = body;

    // basic checks for empty
    if (!name || !code) {
      return NextResponse.json(
        { error: "please enter both name and event code" },
        { status: 400 }
      );
    }

    // finds event in database
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("code", code)
      .single();

    // display if cannot be found
    if (eventError || !event) {
      return NextResponse.json(
        { error: "event not found. check the code again." },
        { status: 404 }
      );
    }

    // create guest in supabase
    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .insert([{ name, event_id: event.id }])
      .select()
      .single();

      // more error handling
    if (guestError) {
      return NextResponse.json(
        { error: guestError.message },
        { status: 400 }
      );
    }

    // if everything goes right, redirect to the event
    return NextResponse.json(
      { eventId: event.id, guestId: guest.id },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
