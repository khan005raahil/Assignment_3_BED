import { eventService } from "../src/api/v1/services/eventService";
import { eventRepository } from "../src/api/v1/repositories/eventRepository";

jest.mock("../src/api/v1/repositories/eventRepository", () => ({
  eventRepository: {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
}));

describe("eventService", () => {

  it("createEvent should call repo.create", async () => {
    (eventRepository.create as jest.Mock).mockResolvedValue("id123");

    const payload: any = {
      name: "My Event",
      date: new Date(Date.now() + 86400000).toISOString(),
      capacity: 5,
      category: "general",
      status: "active",
      registrationCount: 0,
    };

    const result = await eventService.createEvent(payload);

    expect(eventRepository.create).toHaveBeenCalled();
    expect(result.id).toBe("id123");
    expect(result.name).toBe("My Event");
  });


  it("getAllEvents should call repo.getAll", async () => {
    (eventRepository.getAll as jest.Mock).mockResolvedValue([]);

    const result = await eventService.getAllEvents();

    expect(eventRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });


  it("getEventById should call repo.getById", async () => {
    const mockEvent = { id: "1", name: "Event" };
    (eventRepository.getById as jest.Mock).mockResolvedValue(mockEvent);

    const result = await eventService.getEventById("1");

    expect(eventRepository.getById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockEvent);
  });


it("updateEvent should return ok true when repo.update succeeds", async () => {
  (eventRepository.update as jest.Mock).mockResolvedValue(true);

  const result = await eventService.updateEvent("1", { name: "Updated" });

  expect(eventRepository.update).toHaveBeenCalledWith(
    "1",
    expect.objectContaining({ name: "Updated" })
  );

  expect(result.ok).toBe(true);
});


  it("deleteEvent should return ok true when repo.remove succeeds", async () => {
    (eventRepository.remove as jest.Mock).mockResolvedValue(true);

    const result = await eventService.deleteEvent("1");

    expect(eventRepository.remove).toHaveBeenCalledWith("1");
    expect(result.ok).toBe(true);
  });

});