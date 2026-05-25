import {Router} from "express"
import { DeliveryLogsController } from "@/controller/delivery-logs-controller.js"
import { ensureAutenticated } from "@/middlewares/ensure-authenticated.js"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization.js"

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post(
  "/",
  ensureAutenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
)

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAutenticated,
  verifyUserAuthorization(["sale","customer"]),
  deliveryLogsController.show
)

export{deliveryLogsRoutes}