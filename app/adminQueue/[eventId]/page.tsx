// for async and supabase
import { supabase } from "@/app/lib/supabaseClient";
import SongList from "./SongList"; // client component for list + remove buttons

// so params.eventId will be a string
interface AdminQueueProps {
  params: {
    eventId: string; // holds the uuid of the event in the url
  };
}

// this is the main component for the admin queue page
// for [eventId] next.js gives us the id through params
export default async function AdminQueuePage({ params }: AdminQueueProps) {
  const { eventId } = await params;
  // params must be awaited now THIS IS CRUCIAL

  // get event info using uuid from the url
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  // show error message if event doesnt pop up
  if (error || !event) {
    return (
      <div className="body-bg text-center p-10">
        <h1 className="neon-text text-3xl">event not found</h1>
      </div>
    );
  }

  // load songs for this event
  const { data: songs, error: songError } = await supabase
    .from("songs")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  const songList = songError || !songs ? [] : songs;

  return (
    <div className="body-bg min-h-screen p-8">
      <main className="page-container text-center">

        {/* event header */}
        <h1 className="neon-text text-5xl mb-8">PARTY TIME!</h1>

        {/* show event name */}
        <div className="card neon-blue-glow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to {event.name}!</h2>
          <p className="text-lg text-slate-300">
            event code: <span className="font-bold">{event.code}</span>
          </p>
        </div>

        {/* queue items area */}
        <div className="card neon-pink-glow p-6">
          <h3 className="text-xl font-semibold mb-3">song queue</h3>

          {/* if no songs, show message */}
          {songList.length === 0 && (
            <p className="text-slate-300 text-sm">no songs requested yet!</p>
          )}

          {/* USE SONG LIST COMPONENT NOW */}
          {songList.length > 0 && (
            <SongList songs={songList} eventId={eventId} guestId={null} />
          )}
        </div>

      </main>
    </div>
  );
}
