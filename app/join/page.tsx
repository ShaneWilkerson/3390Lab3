export default function join() {
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

            <input 
                type="text"
                placeholder="Enter your name"
                className="input-primary mb-6 px-3 py-2 rounded border"
            />

            <a href="/joinerPage" className="btn-primary text-lg">
                Join
            </a>


          </div>

        </div>
      </main>
    </div>
    );
  }