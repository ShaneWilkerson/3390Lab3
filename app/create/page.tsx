"use client"; 
// this lets us use react state and event handlers on this page, runs on the broswer, not server

import { useState } from "react";

export default function CreatePage() {
  // input boxes 
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  // function that runs for create event button
  async function handleCreate() {
    // sending the name and code to our backend api route
    const res = await fetch("/api/create-event", {
      method: "POST",
      body: JSON.stringify({ name, code }), // this sends data
    });

    const data = await res.json();

    // error handle
    if (data.error) {
      alert(data.error);
      return;
    }

    // this is the uuid of the new event we just made
    const eventId = data.event.id;

    // re route creater to admin queue screen
    window.location.href = `/adminQueue/${eventId}`;
  }

  return (
    <div className="body-bg flex items-center justify-center">
      <main className="page-container text-center">

        <a
            href="/" 
            className="absolute top-4 left-4 btn-outline textsm"
        >
            Back
        </a>

        {/* neon title at the top */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          QUEUEITUP
        </h1>

        {/* main card box */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-6 text-center">
            let's get this party started!
          </h2>

          {/* input fields and button */}
          <div className="flex flex-col gap-4">

            {/* event name */}
            <input
              type="text"
              placeholder="enter name of the event"
              className="input-primary mb-4 px-3 py-2 rounded border"
              value={name} // keeps the input controlled
              onChange={(e) => setName(e.target.value)} // updates state
            />

            {/* event code */}
            <input 
              type="text"
              placeholder="enter private code for the queue"
              className="input-primary mb-6 px-3 py-2 rounded border"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            {/* when clicked, it will call our api */}
            <button 
              className="btn-primary text-lg px-4 py-2"
              onClick={handleCreate}
            >
              create
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}
