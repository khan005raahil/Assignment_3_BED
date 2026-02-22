import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events";

type EventDoc = Omit<Event, "id">; 

export const eventRepository = {
  create: async (data: EventDoc): Promise<string> => {
    const docRef = await db.collection(COLLECTION).add(data);
    return docRef.id;
  },

  getAll: async (): Promise<Event[]> => {
    const snap = await db.collection(COLLECTION).get();

    return snap.docs.map((d) => {
      const data = d.data() as EventDoc; 
      return { id: d.id, ...data };
    });
  },

  getById: async (id: string): Promise<Event | null> => {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as EventDoc;
    return { id: doc.id, ...data };
  },

  update: async (id: string, data: Partial<EventDoc>): Promise<boolean> => {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.update(data);
    return true;
  },

  remove: async (id: string): Promise<boolean> => {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.delete();
    return true;
  },
};