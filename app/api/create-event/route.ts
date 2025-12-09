import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// function for create event
export async function POST(req: Request) {
  try {
    // get the event name and code from user that they typed
    const body = await req.json();
    const { name, code } = body;

    // basic check so someone doesn't send empty data
    if (!name || !code) {
      return NextResponse.json(
        { error: "please enter both name and code" },
        { status: 400 }
      );
    }

    // insert event into database
    const { data, error } = await supabase
      .from("events")
      .insert([{ name, code }])
      .select()
      .single();

    // display any errorrs
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // RETURN THE EVENT and ADMIN URL FOR EASY REJOINING
    return NextResponse.json(
      { 
        event: data,
        adminUrl: `/adminQueue/${data.id}` 
      }, 
      { status: 200 }
    );

  } catch (err) {
    // display errors from server
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}
