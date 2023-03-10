
import { Request,Response,NextFunction } from "express"
import userCollection from '../../model/userModel'
import { sendVerificationToken ,checkVerificationToken} from '../../utils/otp_verfication'



  
export const register= async (req:Request, res:Response, next:NextFunction) => {


    try {

        const { fullname,  mobile }: { fullname: string,  mobile: number } = req.body
      
        const userExist = await userCollection.findOne({mobile})
        if (userExist) {
            throw new Error('user already exists')
        } else {

            let status: any = await sendVerificationToken(mobile)
            

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

 
   
    const {otp}:{otp:string}= req.body
    const data= await checkVerificationToken(otp,7994358015)
     
    
}

