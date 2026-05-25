import { Router } from "express";
import { SessionsController } from "@/controller/sessions-controller.js";
import { usersRoutes } from "./users-routes.js";

const sessionsRoutes = Router()
const sessionController = new SessionsController()

sessionsRoutes.post("/",sessionController.create)

export {sessionsRoutes}
