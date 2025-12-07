export default function requestPage() {
  return (
    <div className="body-bg flex items-center justify-center">
      <main className="page-container text-center">

        {/* Neon Title */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          PARTY TIME!
        </h1>

        {/* Card container */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Request a song 
          </h2>

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