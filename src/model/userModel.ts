import mongoose  from "mongoose"
import { IUser } from "../interface/interface"


const userSchema=new mongoose.Schema<IUser>({

    name:{
        type:String, 
        required:[true,'Name cannot be empty']     
    }  ,
    avatar:String,
    mobile:{
        type:Number,
        unique:true,
        required:[true,'mobile number cannot be empty'] 
    },
    address:{
        fullName:String,
        email_id:String,
        mobile:Number,
        streetName:String,
        landMark:String,
        zipCode:Number
    },
    booking:[{
        type:mongoose.Types.ObjectId,
        ref:'booking'
   }],
    isBlocked:{
        type:Boolean,
        default:false
    }

})


export default mongoose.model<IUser>('user',userSchema)

