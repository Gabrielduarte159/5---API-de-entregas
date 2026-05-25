import { describe, it, expect } from "@jest/globals";
import request from "supertest"
import { app } from "@/app.js";
import { prisma } from "@/database/prisma.js";


describe("UsersController",()=>{
  let user_id:string
  
  afterAll(async () => {
    await prisma.user.delete({where:{id:user_id}});
  });

  it("should create a new user sucessfully", async ()=>{
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: `testuser@example.com`,
      password: "password123",
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.name).toBe("Test User")

    user_id = response.body.id
  })
  it("should throw an error if user with same email alreaty exist",async()=>{
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: `testuser@example.com`,
      password: "password123",
    })   
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User with same email already exist")
  })
  it("should throw a validation error if email is invalid",async()=>{
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: `invalidemail`,
      password: "password123",     
    })
      expect(response.status).toBe(400)
      expect(response.body.message).toBe("validation error")
  })
})



