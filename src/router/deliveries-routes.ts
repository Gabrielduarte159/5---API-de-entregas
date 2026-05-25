import {Router} from "express"
import { DeliveriesController } from "@/controller/deliveries-controller.js"
import { ensureAutenticated } from "@/middlewares/ensure-authenticated.js"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js"
import { DeliveriesStatusController } from "@/controller/deliveries-status-controller.js"

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController()
const deliveriesStatusController = new DeliveriesStatusController()

deliveriesRoutes.use(ensureAutenticated,verifyUserAuthorization(["sale"]))
deliveriesRoutes.post("/",deliveriesController.create)
deliveriesRoutes.get("/",deliveriesController.index)
deliveriesRoutes.patch("/:id/status",deliveriesStatusController.update)

export{deliveriesRoutes}
