import mongoose  from "mongoose"

interface Address{
    fullName:string,
    email:string,
    mobile:number,
    streetName:string,
    landMark:string,
    zipCode:number
}

interface User{
    name:string,
    email:string,
    mobile:number,
    address?:Address,
    isBlocked:boolean,
    isExpert:boolean,
    booking?:mongoose.Types.Array<mongoose.Types.ObjectId>,
    expertCategory?:string,
    expertRating?:number,  
    expertWorks?:mongoose.Types.Array<mongoose.Types.ObjectId>
}


const userSchema=new mongoose.Schema<User>({

    name:{
        type:String, 
        required:[true,'Name cannot be empty']     
    }  ,
    email:{
        type:String,
        unique:true,
        required:[true,'Email cannot be empty'] ,
        lowercase:true    

    },
    mobile:{
        type:Number,
        unique:true,
        required:[true,'mobile number cannot be empty'] 
    },
    address:{
        fullName:String,
        email:String,
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

