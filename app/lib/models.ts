export type EventStatus = "active" | "ended";

export interface Event {
  id: string;          // uuid
  name: string;        // name of event like Paul's wedding
  code: string;        // code used to join the event
  createdAt: string;   // date
  status: EventStatus;
}

export interface Guest {
  id: string;          
  name: string;        // temp display name, like "Paul" or "Table 3"
  joinedAt: string;    
  eventId: string;     // FOreign key for Event.id
}

export type SongStatus = "pending" | "playing" | "skipped";

export interface SongRequest {
  id: string;
  eventId: string;
  addedByGuestId: string;
  title: string;       // name of any song 
  artist?: string;
  votes: number;
  status: SongStatus;
  createdAt: string;
}

export interface Vote {
  id: string;
  songId: string;
  guestId: string;
  createdAt: string;
}
