import {Router} from "express"
import { UsersController} from "@/controller/users-controllers.js"

const usersRoutes = Router()
const usersController = new UsersController() 

usersRoutes.post("/",usersController.create)

export { usersRoutes }