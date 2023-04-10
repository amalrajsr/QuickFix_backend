import { Schema,Types,model } from "mongoose";
import { IExpert } from "../interface/interface";


const expertSchema=new Schema<IExpert>({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    service:{
        type:Types.ObjectId,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
         default:false
    },
    isBlocked:{
        type:Boolean,
         default:false

    },  
    works:[{
        type:Types.ObjectId,
        ref:'booking'
   }],
    

})

export default model<IExpert>('expert',expertSchema)