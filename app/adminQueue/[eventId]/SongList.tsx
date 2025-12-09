"use client";
// for buttons and updates

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function SongList({
  songs,
  eventId,
  guestId
}: {
  songs: any[];
  eventId: string;
  guestId: string | null;
}) 
{

  // local state so songs can update live
  const [songList, setSongList] = useState(songs);

  // highest votes or oldest request
  function sortSongs(list: any[]) {
    return list.slice().sort((a, b) => {
      if (a.votes !== b.votes) {
        return b.votes - a.votes; // more votes first
      }
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }

  // apply sorting on load
  useEffect(() => {
    setSongList(sortSongs(songs));
  }, [songs]);

  // real time updates
  useEffect(() => {
    const channel = supabase
      .channel("song_updates")
      .on(
        "postgres_changes",
        { 
          event: "*", 
          schema: "public", 
          table: "songs", 
          filter: `event_id=eq.${eventId}` 
        },
        (payload) => {
          // update local list depending on event type
          if (payload.eventType === "INSERT") {
            setSongList(prev => sortSongs([...prev, payload.new]));
          }
          if (payload.eventType === "UPDATE") {
            setSongList(prev =>
              sortSongs(prev.map(s => (s.id === payload.new.id ? payload.new : s)))
            );
          }
          if (payload.eventType === "DELETE") {
            setSongList(prev => prev.filter(s => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);


  // when user clicks upvote
  async function handleUpvote(songId: string, guestId: string | null) {
    if (!guestId) {
      alert("cannot upvote without guest id");
      return;
    }

    const res = await fetch("/api/upvote-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId, guestId })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "could not upvote");
      return;
    }

    // mark song voted and change to voted!
    setSongList(prev =>
      prev.map(s =>
        s.id === songId ? { ...s, user_has_voted: true } : s
      )
    );
  }


  // when admin removes a song
  async function handleRemove(songId: string) {
    await fetch("/api/remove-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });
    // auto update list
  }


  return (
    <ul className="mt-3 space-y-3">
      {songList.map((song) => {

        // check if this guest already voted
        const alreadyVoted = song.user_has_voted === true;

        return (
          <li
            key={song.id}
            className="flex items-center justify-between bg-slate-900/60 px-4 py-3 rounded-lg border border-slate-800"
          >
            {/* song text and vote count */}
            <span className="text-pink-300">
              {song.title} — {song.artist || "unknown"}
              {song.votes > 0 && (
                <span className="ml-2 text-blue-300">
                  ({song.votes} votes)
                </span>
              )}
            </span>

            {/* action buttons */}
            <div className="flex gap-2">

              {/* UPVOTE button for joiners */}
              {guestId && (
                <button
                  onClick={() => handleUpvote(song.id, guestId)}
                  disabled={alreadyVoted}
                  className={`px-2 py-1 text-sm rounded-md border transition 
                    ${alreadyVoted 
                      ? "text-green-300 border-green-300 cursor-default" 
                      : "text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"}
                  `}
                >
                  {alreadyVoted ? "voted!" : "upvote"}
                </button>
              )}

              {/* REMOVE button for admin */}
              {!guestId && (
                <button
                  onClick={() => handleRemove(song.id)}
                  className="px-2 py-1 text-sm text-red-400 border border-red-400 rounded-md hover:bg-red-400 hover:text-white transition"
                >
                  remove
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
