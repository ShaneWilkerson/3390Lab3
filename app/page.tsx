export default function HomePage() {
  return (
    <div className="body-bg flex items-center justify-center">
      <main className="page-container text-center relative">

        {/* Learn More Button */}
        <a 
          href="/learnMore" 
          className="absolute bottom-0 right-0 mt-4 mr-4 btn-outline text-sm"
          style={{ bottom: "-8rem", right: "-6rem"}}
        >
          Learn More
        </a>

        {/* Neon Title */}
        <h1 className="text-5xl font-bold mb-10 neon-text tracking-widest">
          QUEUEITUP
        </h1>

        {/* Card container */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Party Time 
          </h2>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <a href="/create" className="btn-primary text-lg">
              Create Queue
            </a>

            <a href="/join" className="btn-outline text-lg">
              Join Queue
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
