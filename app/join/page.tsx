"use client"; 
// needed so we can use state and the join button works

import { useState } from "react";

export default function JoinPage() {

  // storing the users input values
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  // function that runs when the user clicks join
  async function handleJoin() {

    // send the name and event code to db
    const res = await fetch("/api/join-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      // added this so backend parses json correctly
      body: JSON.stringify({ name, code }),
    });

    const data = await res.json();

    // if the code is wrong or anything else is bad
    if (data.error) {
      alert(data.error);
      return;
    }

    // if everything is good, redirect to joiner page
    // added guestId so joiner page knows who this guest is
    window.location.href = `/joinerPage/${data.eventId}?guestId=${data.guestId}`;
  }

  return (
    <div className="body-bg flex items-center justify-center min-h-screen">
      <main className="page-container text-center">

        {/* neon title at top */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          QUEUEITUP
        </h1>

        {/* card container for inputs */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Join the party!
          </h2>

          {/* input fields */}
          <div className="flex flex-col gap-4">

            {/* event code */}
            <input 
              type="text"
              placeholder="Enter private code for the queue"
              className="input-primary mb-6 px-3 py-2 rounded border"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            {/* guest name */}
            <input 
              type="text"
              placeholder="Enter your name"
              className="input-primary mb-6 px-3 py-2 rounded border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* join button calls our function */}
            <button 
              className="btn-primary text-lg"
              onClick={handleJoin}
            >
              Join
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}
