import { NextFunction, Request,Response } from "express"
import { TokenExpiredError } from "jsonwebtoken";
import AppError from "../utils/error"
const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    
     console.log(err);
    
    if(err instanceof AppError){

        res.status(err.statusCode).json({error:{success:false,message:err.message}})

    }else if(err instanceof TokenExpiredError){

        res.status(401).json({error:{success:false,tokenExpired:true,message:'token expired'}})
    }
    else{
        res.status(500).json({error:{success:false,message:'something went wrong'}})
    }

}  



export default errorHandler

