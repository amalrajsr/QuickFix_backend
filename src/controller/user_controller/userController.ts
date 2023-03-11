
import { Request,Response,NextFunction } from "express"
import userCollection from '../../model/userModel'
import { sendVerificationToken ,checkVerificationToken} from '../../utils/otp_verfication'
import AppError from "../../utils/error"

  
export const register= async (req:Request, res:Response, next:NextFunction) => {


    try {

        const { fullname,  mobile }: { fullname: string,  mobile: number } = req.body
      
        const userExist = await userCollection.findOne({mobile})
        if (userExist) {
            // res.status(409)
            throw new AppError(409,'user already exists')
        } else {

            req.session.user=req.body
           let otp_status = await sendVerificationToken(mobile)
            

            res.status(200).json({
                success: true
            })
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
            res.json({
                created:true,
                user
            }).status(201)
         }else{
            //  res.status(400)
             throw new AppError(400,'invalid otp')
            }
        }else{
            
            throw new AppError(500,'Something went wrong')

        }

    }catch(error){

        console.log(error);
        next(error)
        
    }
   
     
    
}

