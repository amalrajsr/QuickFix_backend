import { Request,Response,NextFunction } from "express"

const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({error:{message:err.message}})

}

export default errorHandler

