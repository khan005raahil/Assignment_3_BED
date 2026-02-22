import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../Constant/httpStatus";
import { eventService } from "../services/eventService";

export const eventController = {
  create: async (req: Request, res: Response) => {
    const created = await eventService.createEvent(req.body);
    res.status(HTTP_STATUS.CREATED).json(created);
  },

  getAll: async (_req: Request, res: Response) => {
    const events = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json(events);
  },

  getById: async (req: Request<{ id: string }>, res: Response) => {
    const event = await eventService.getEventById(req.params.id);
    if (!event) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    res.status(HTTP_STATUS.OK).json(event);
  },

  update: async (req: Request<{ id: string }>, res: Response) => {
    const result = await eventService.updateEvent(req.params.id, req.body);

    if (!result.ok && result.status === 404) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    }

    if (!result.ok && result.status === 400) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.message });
    }

    return res.status(HTTP_STATUS.OK).json({ message: "Event updated" });
  },

  remove: async (req: Request<{ id: string }>, res: Response) => {
    const result = await eventService.deleteEvent(req.params.id);

    if (!result.ok) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    }

    return res.status(HTTP_STATUS.NO_CONTENT).send();
  },
};