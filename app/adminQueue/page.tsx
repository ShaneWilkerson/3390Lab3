"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export default function adminQueue() {
    
    const { eventId } = useParams() as { eventId: string };

    const [event, setEvent] = useState<any>(null);
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEventAndSongs() {
            setLoading(true);

            const { data: eventData } = await supabase
                .from("events")
                .select("*")
                .eq("id", eventId)
                .single();

            setEvent(eventData || "NOT_FOUND");

            const { data: songsData } = await supabase
                .from("songs")
                .select("*")
                .eq("event_id", eventId)
                .order("created at", { ascending: true });

            setSongs(songsData || []);

            setLoading(false);
        }

        if (eventId){
            loadEventAndSongs();
        }
    }, [eventId]);

    if (event === "NOT_FOUND") {
        return (
            <div className="body-bg text-center p-10">
                <h1 className="neon-text text-3xl">Event not found!</h1>
            </div>
        );
    }

    return(
        <div className="body-bg flex items-center justify-center">
            <main className="page-container text-center">

                {/* Title */ }
                <h1 className="text-5xl font-bold mb-10 neon-text  tracking-widest">
                    {event.name} Queue
                </h1>

                <div className="card neon-blue-glow p-8 max-w-md mx-auto text-left">

                    <h2 className="text-2xl font-semibold text-pink-300 mb-6 text-center">
                        Requested Songs:
                    </h2>

                    {songs.length === 0 ? (
                        <p className="text-slate-300 text-center">No requests yet!</p>
                    ) : (
                        <ul className="space-y-3">
                            {songs.map((song) =>  (
                                <li
                                    key={song.id}
                                    className="bg-slate-900/70 p-3 rounded border border-slate-700"
                                >
                                    <p className="text-white font-semibold">{song.title}</p>

                                    {song.artist && (
                                        <p className="text-slate-400 text-sm">{song.artist}</p>
                                    )}

                                    <p className="text-slate-500 text-xs mt-1">
                                        guest: {song.guest_id}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )
                    }
                </div>
            </main>
        </div>
    );

}