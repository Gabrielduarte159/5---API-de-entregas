import { describe, it, expect } from "@jest/globals";
import request from "supertest"
import { app } from "@/app.js";
import { prisma } from "@/database/prisma.js";

describe("SessionsController",()=>{
  let user_id:string
  
  afterAll(async () => {
    await prisma.user.delete({where:{id:user_id}});
  });

  it("hould authenticate and get access token",async () =>{
    const userResponse = await request(app).post("/users").send({
      name: "Auth Test User",
      email: `auth_test_user@example.com`,
      password: "password123",
    })
    user_id = userResponse.body.id
    const sessionResponse = await request(app).post("/sessions").send({
      email: `auth_test_user@example.com`,
      password: "password123"
    })
    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body.token).toEqual(expect.any(String))
  })
})