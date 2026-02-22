import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events";

export const eventRepository = {
  create: async (data: Event) => {
    const docRef = await db.collection(COLLECTION).add(data);
    return docRef.id;
  },

  getAll: async () => {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Event) }));
  },

  getById: async (id: string) => {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Event) };
  },

  update: async (id: string, data: Partial<Event>) => {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;
    await ref.update(data);
    return true;
  },

  remove: async (id: string) => {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;
    await ref.delete();
    return true;
  },
};