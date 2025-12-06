//  exports/imports
    return (
        <div className="body-bg flex items-center justify-center">
            <main className="page-container text-center">

        {/* Neon Title */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          QUEUEITUP
        </h1>

        {/* Card container */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Let's get this party started!
          </h2>

          {/* Input Field & Join Button */}
          <div className="flex flex-col gap-4">

            <input 
                type="text"
                placeholder="Enter private code for the queue"
                className="input-primary mb-6 px-3 py-2 rounded border"
            />

            <button className="btn-primary text-lg px-4 py-2">
                Join
            </button>

          </div>

        </div>
      </main>
    </div>
    );