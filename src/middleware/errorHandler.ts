import { Request,Response,NextFunction } from "express"

const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    
    res.json({error:{success:false,message:err.message}})
    // if(err.statusCode){

    //     res.status(err.statusCode).json({error:{success:false,message:err.message}}).status(err.statusCode)

    // }else{
    //     res.json({error:{success:false,message:'something went wrong'}})
    // }

}

export default errorHandler

