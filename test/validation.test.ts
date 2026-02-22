jest.mock("../src/api/v1/repositories/eventRepository", () => ({
  eventRepository: {
    create: jest.fn().mockResolvedValue("testDocId"),
    getAll: jest.fn().mockResolvedValue([]),
    getById: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(true),
    remove: jest.fn().mockResolvedValue(true),
  },
}));

import request from "supertest";
import app from "../src/app";

const tomorrowIso = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString();
};

describe("POST /api/v1/events validation", () => {
  it("should create event and apply defaults", async () => {
    const body = { name: "My Event", date: tomorrowIso(), capacity: 5 };

    const res = await request(app).post("/api/v1/events").send(body);

    expect(res.status).toBe(201);
    expect(res.body.category).toBe("general");
    expect(res.body.status).toBe("active");
    expect(res.body.registrationCount).toBe(0);

    // Optional checks
    expect(res.body.name).toBe("My Event");
    expect(res.body.capacity).toBe(5);
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.updatedAt).toBeDefined();
  });

  it("should fail if name is too short", async () => {
    const res = await request(app).post("/api/v1/events").send({
      name: "ab",
      date: tomorrowIso(),
      capacity: 5,
    });

    expect(res.status).toBe(400);
  });

  it("should fail if capacity < 5", async () => {
    const res = await request(app).post("/api/v1/events").send({
      name: "Valid Name",
      date: tomorrowIso(),
      capacity: 4,
    });

    expect(res.status).toBe(400);
  });

  it("should fail if registrationCount > capacity", async () => {
    const res = await request(app).post("/api/v1/events").send({
      name: "Valid Name",
      date: tomorrowIso(),
      capacity: 5,
      registrationCount: 6,
    });

    expect(res.status).toBe(400);
  });

  it("should fail if date is today", async () => {
    const res = await request(app).post("/api/v1/events").send({
      name: "Valid Name",
      date: new Date().toISOString(),
      capacity: 5,
    });

    expect(res.status).toBe(400);
  });
});