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


          {/* Song request field and button */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          {/* Song request field and button */}
          <div className="flex flex-col gap-4">
            
            <input
                type="text"
                placeholder="Enter song name"
                className="input-primary px-3 py-2 rounded border mb-4 w-full max-w-sm"
            />

            <input
                type="text"
                placeholder="Enter artist's name"
                className="input-primary px-3 py-2 rounded border mb-4 w-full max-w-sm"
            />

            <button
                className="btn-primary text-lg px-4 py-2"
            >
                Request
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}