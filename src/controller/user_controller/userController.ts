
import { RequestHandler, Request,Response,NextFunction } from "express"
import userCollection from '../../model/userModel'
import { sendVerificationToken ,checkVerificationToken} from '../../utils/otp_verfication'
import AppError from "../../utils/error"
import { createToken } from "../../utils/token_generator"
import {userServices} from '../../services/user_service'
import asyncHandler from "express-async-handler"
export const register= async (req:Request, res:Response, next:NextFunction) => {


    try {

        const { fullname,  mobile }: { fullname: string,  mobile: number } = req.body
      
        const userExist = await userServices.findUserByMobile(mobile)
        
        if (userExist) {
            throw new AppError(409,'user already exists')
        } else {

            req.session.user=req.body
            
           let otp_status = await sendVerificationToken(mobile)
            
             if(otp_status){
                res.status(200).json({
                    success: true
                })
             }else{
                throw new AppError(500,'Something went wrong please try again later')
             }
          
        }

    } catch (error) {
        console.log(error);
        next(error)
    }

}

export const verify_otp= async(req:Request,res:Response,next:NextFunction)=>{

    try{


        if(req.session.user){

        const {fullname,mobile}=req.session.user
         
         const otp:string= req.body.mobile 
           const data= await checkVerificationToken(otp,mobile)
              
         if(data){
             const user= new userCollection({
                 name:fullname,
                 mobile:mobile
             })
             
            await user.save()
            const token=  createToken(user._id)
            res.json({
                created:true,
                user,
                token
            }).status(201)
         }else{
             throw new AppError(400,'invalid otp')
            }
        }else{
            
            throw new AppError(500,'Something went wrong please try again later')

        }

    }catch(error){

        console.log(error);
        next(error)
        
    }
   


 }    
    

 export const user_login:RequestHandler=async(req,res,next)=>{

try{

    const mobile:number=req.body.mobile
    const userExist = await userServices.findUserByMobile(mobile)
    if(userExist){
        const otp_status = await sendVerificationToken(mobile)
         if(otp_status){
            res.json({
                success:true
            }).status(200)
         }        

    }else{
        throw new AppError(400,'Something went wrong please try again later')
    }

}catch(err){
    console.log(err);
    next(err)
    
}
 
    
}

export const verify_login_otp:RequestHandler = asyncHandler(async(req,res,next)=>{

        const {mobile,otp}:{mobile:number,otp:string}=req.body
   
        const otp_status= await checkVerificationToken(otp,mobile)
          if(otp_status){
           const user= await userServices.findUserByMobile(mobile)
          
           const token=  createToken(user._id)
           res.json({
               success:true,
               user,
               token
           })
       
          }else{
           throw new AppError(400,'Invalid OTP')
          } 

})

