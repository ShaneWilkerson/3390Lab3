"use client"; 
// needed so we can use state, read guestId from url, and use button clicks

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  
import { supabase } from "@/app/lib/supabaseClient";
import SongList from "@/app/adminQueue/[eventId]/SongList";


export default function JoinerPage({ params }: { params: { eventId: string } }) {

  // get event id from route folder
  const { eventId } = useParams() as { eventId: string }; 

  // will store the event data from supabase
  const [event, setEvent] = useState<any>(null);

  // will store all songs for this event
  const [songs, setSongs] = useState<any[]>([]); // added this

  // store user input for song request
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  // store guestId from url
  const [guestId, setGuestId] = useState<string | null>(null);

  // simple loading and message for request feedback
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // load event information from supabase
  useEffect(() => {
    async function loadEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      // if event is not found
      if (error || !data) {
        setEvent("NOT_FOUND");
        return;
      }

      setEvent(data);

      // now load the songs for this event
      const { data: songData, error: songErr } = await supabase
        .from("songs")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: true });

      // store songs
      if (!songErr && songData) {
        setSongs(songData);
      }
    }

    loadEvent();
  }, [eventId]);

  // read guestId from url when page loads
  useEffect(() => {
    // this pulls the guest id
    const searchParams = new URLSearchParams(window.location.search);
    const gId = searchParams.get("guestId");
    setGuestId(gId); // save it in state
  }, []);

  // run when user clicks request
  async function handleRequest() {
    setLoading(true);
    setMessage("");

    // small check to be safe
    if (!guestId) {
      setMessage("could not find guest id");
      setLoading(false);
      return;
    }

    // send request to api route
    const res = await fetch("/api/request-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // needed so server reads json
      body: JSON.stringify({
        title,
        artist,
        eventId,
        guestId, // changed the join page.tsx so we can use it now
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage("could not request song");
      return;
    }

    setMessage("song added!");
    setTitle("");
    setArtist("");

    // reload songs after inserting (so the list updates right away)
    const { data: newSongs } = await supabase
      .from("songs")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: true });

    setSongs(newSongs || []);
  }

  // show loading page while fetching
  if (event === null) {
    return (
      <div className="body-bg text-center p-10">
        <h1 className="neon-text text-3xl">loading event...</h1>
      </div>
    );
  }

  // if event is missing
  if (event === "NOT_FOUND") {
    return (
      <div className="body-bg text-center p-10">
        <h1 className="neon-text text-3xl">event not found</h1>
      </div>
    );
  }
  
  // original text that we had
  return (
    <div className="body-bg flex items-center justify-center">
      <main className="page-container text-center">

        <a
            href="/join" 
            className="absolute top-4 left-4 btn-outline textsm"
        >
            Back
        </a>

        {/* Neon Title */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          {event.name}
        </h1>

        {/* Song request field and button */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          {/* Song request field and button */}
          <div className="flex flex-col gap-4">
            
            <input
                type="text"
                placeholder="Enter song name"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // added state handling
                className="input-primary px-3 py-2 rounded border mb-4 w-full max-w-sm"
            />

            <input
                type="text"
                placeholder="Enter artist's name"
                value={artist}
                onChange={(e) => setArtist(e.target.value)} // added state handling
                className="input-primary px-3 py-2 rounded border mb-4 w-full max-w-sm"
            />

            <button
                className="btn-primary text-lg px-4 py-2"
                onClick={handleRequest} // added click handler
                disabled={loading} // prevent spam clicking
            >
                {loading ? "sending..." : "Request"}
            </button>

            {message && (
              <p className="text-pink-300">{message}</p>
            )}
          </div>

          {/* list of requested songs */}
          {/* shared song list UI */}
<div className="mt-8 text-left">
  <SongList songs={songs} eventId={eventId} guestId={guestId} />
</div>

        </div>

      </main>
    </div>
  );
}
