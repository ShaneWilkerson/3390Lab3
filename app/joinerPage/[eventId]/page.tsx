// this is a server component, so we can load data directly from supabase
import { supabase } from "@/app/lib/supabaseClient";

export default async function JoinerPage({ params }: { params: { eventId: string } }) {
  
  // next.js 14: params is a promise, so we must await it
  const { eventId } = await params;

  // get the event info from supabase
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  // if the event is not found
  if (error || !event) {
    return (
      <div className="body-bg text-center p-10">
        <h1 className="neon-text text-3xl">event not found</h1>
      </div>
    );
  }
  
  return (
    <div className="body-bg flex items-center justify-center">
      <main className="page-container text-center">

        {/* Neon Title */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          {event.name}
        </h1>

        {/* Card container */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Requested Songs 
          </h2>

          {/* Song request field and button */}
          <div className="flex flex-col gap-4">
            
            <a href="requestPage" className="btn-primary text-lg">
              Request a song
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}