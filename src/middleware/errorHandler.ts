import { Request,Response,NextFunction } from "express"
import AppError from "../utils/error"
const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    
    
    if(err instanceof AppError){

        res.status(err.statusCode).json({error:{success:false,message:err.message}}).status(err.statusCode)

    }else{
        res.status(500).json({error:{success:false,message:'something went wrong'}})
    }

}  

export default errorHandler

