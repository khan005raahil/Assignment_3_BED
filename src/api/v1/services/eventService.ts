import { Event } from "../models/eventModel";
import { eventRepository } from "../repositories/eventRepository";

const nowIso = () => new Date().toISOString();

export const eventService = {
  createEvent: async (payload: Event) => {
    // Joi already ensures: registrationCount <= capacity and date rule
    const data: Event = {
      ...payload,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    const id = await eventRepository.create(data);
    return { id, ...data };
  },

  getAllEvents: async () => {
    return eventRepository.getAll();
  },

  getEventById: async (id: string) => {
    return eventRepository.getById(id);
  },

  updateEvent: async (id: string, payload: Partial<Event>) => {

    if (payload.registrationCount !== undefined) {
      const existing = await eventRepository.getById(id);
      if (!existing) return { ok: false, status: 404 as const };

      const capacityToUse = payload.capacity ?? existing.capacity;

      if (payload.registrationCount > capacityToUse) {
        return { ok: false, status: 400 as const, message: "registrationCount must be less than or equal to capacity" };
      }
    }

    const ok = await eventRepository.update(id, { ...payload, updatedAt: nowIso() });
    if (!ok) return { ok: false, status: 404 as const };
    return { ok: true, status: 200 as const };
  },

  deleteEvent: async (id: string) => {
    const ok = await eventRepository.remove(id);
    if (!ok) return { ok: false, status: 404 as const };
    return { ok: true, status: 204 as const };
  },
};