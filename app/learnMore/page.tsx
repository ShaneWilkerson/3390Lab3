export default function learnMore(){
    return(
    <div className="body-bg flex items-center justify-center">
      <main className="page-container text-center">

        <a
            href="/" 
            className="absolute top-4 left-4 btn-outline textsm"
        >
            Back
        </a>
        
        {/* Neon Title */}
        <h1 className="text-5xl font-bold mb-10 neon-blue-t tracking-widest">
          More info
        </h1>

        {/* Card container */}
        <div className="card neon-blue-glow p-8 max-w-md mx-auto text-left">
            <p className="leading-relaxed">
            This app was created to give DJ's/AUX cord hoggers to 
            allow requests to be received from event attendees. Music 
            controllers can simply start a queue with an event code, 
            and others may join and request songs! Songs may be upvoted
            by joiners to place them higher on the list, and creators
            can remove songs from the list that they do not wish to play. 
            We hope you enjoy!
            </p>
            <h2 className="text-5xl font-bold mt-10 neon-text text-center tracking-widest">
                Happy Listening!
            </h2>
        </div>
      </main>
    </div>
    );
}