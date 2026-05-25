import { Request,Response } from "express"
import {prisma} from "@/database/prisma.js"
import { z } from "zod"
import { AppError } from "@/utils/AppError.js"
import { describe } from "node:test"


class DeliveryLogsController{
  async create(request:Request,response:Response){
    const bodySchema = z.object({
      delivery_id:z.string().uuid(),
      description: z.string(),
    })
    const {delivery_id,description} = bodySchema.parse(request.body)
    const delivery = await prisma.delivery.findUnique({
      where:{id:delivery_id}
    })
    if(!delivery){
      throw new AppError("Delivery not found",404)
    }
    if(delivery.status ==="delivered"){
      throw new AppError("This order has already been delivered")
    }
    if(delivery.status==='processing'){
      throw new AppError("Change status to shipped first")
    }
    await prisma.deliveryLog.create({
      data:{
        deliveryID: delivery_id,
        description
      }
    })
    return response.status(201).json()
  }
  async show(request:Request,response:Response){
    const paramsSchema = z.object({
      delivery_id:z.string().uuid(),
    })
    const { delivery_id } = paramsSchema.parse(request.params)
    const delivery = await prisma.delivery.findUnique({
      where:{id:delivery_id},
      include:{
        logs:{select:{description:true,id:true }},
        user:true,
      }
    })

    if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
      throw new AppError("The user can onl view their own deliveries",401)
    }

    return response.json(delivery)
  }
}

export { DeliveryLogsController }