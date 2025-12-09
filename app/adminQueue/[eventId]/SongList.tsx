"use client";
// this file handles interactivity like remove buttons

import { useState } from "react";

export default function SongList({ songs, eventId }: any) {

  // local state so items disappear after delete
  const [list, setList] = useState(songs);

  // when admin clicks remove
  async function handleRemove(songId: string) {
    // send delete to api
    await fetch("/api/remove-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });

    // update ui instantly (remove from list)
    setList(list.filter((s: any) => s.id !== songId));
  }

  return (
    <ul className="text-left space-y-2 mt-3">
      {list.map((song: any) => (
        <li
          key={song.id}
          className="flex items-center justify-between bg-slate-900/60 px-4 py-3 rounded-lg border border-slate-800"
        >
          {/* show title + artist */}
          <span className="text-pink-300">
            {song.title} — {song.artist || "unknown artist"}
          </span>

          {/* remove button now works because this is a client component */}
          <button
            onClick={() => handleRemove(song.id)}
            className="px-3 py-1 text-red-400 border border-red-400 rounded-md hover:bg-red-400 hover:text-white transition"
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  );
}
