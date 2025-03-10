import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "..";
import resetDb from "./helpers/reset-db";

describe("POST /sum", () => {
  //   beforeEach(async () => {
  //     console.log("Clearing database");
  //     await resetDb();
  //   });
  beforeAll(async () => {
    console.log("Clearing database");
    await resetDb();
  });
  it("should return the sum of two numbers", async () => {
    const response = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      answer: 3,
      id: expect.any(String),
    });
  });
});
