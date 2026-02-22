export type EventStatus = "active" | "cancelled" | "completed";
export type EventCategory = "conference" | "workshop" | "meetup" | "seminar" | "general";

export interface Event {
  id?: string;
  name: string;
  date: string; 
  capacity: number;
  category: EventCategory; 
  status: EventStatus;     
  registrationCount: number; 
  createdAt: string;
  updatedAt: string;
}