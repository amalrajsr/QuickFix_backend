import mongoose  from "mongoose"

interface IAddress{
    fullName:string,
    email_id:string,
    mobile:number,
    streetName:string,
    landMark:string,
    zipCode:number
}

export  interface IUser{
    _id?:mongoose.Types.ObjectId,
    name:string,
    email?:string,
    avatar?:string,
    mobile:number,
    address?:IAddress,
    isBlocked:boolean,
    isExpert:boolean,
    booking?:mongoose.Types.Array<mongoose.Types.ObjectId>,
    expertCategory?:string,
    expertRating?:number,  
    expertWorks?:mongoose.Types.Array<mongoose.Types.ObjectId>
}


const userSchema=new mongoose.Schema<IUser>({

    name:{
        type:String, 
        required:[true,'Name cannot be empty']     
    }  ,
    email:{
        type:String,
        lowercase:true    

    },
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
        ref:'work'
   }],
    isBlocked:{
        type:Boolean,
        default:false
    }, 
    isExpert:{
        type:Boolean,
        default:false
    },
    expertCategory:{
        type:String
    },
    expertRating:{
        type:Number
    },
    expertWorks:[{
     type:mongoose.Types.ObjectId,
     ref:'work'
}]

})


export default mongoose.model('user',userSchema)

