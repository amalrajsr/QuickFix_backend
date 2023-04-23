import {Types,model,Schema} from "mongoose";
import { IBooking } from "../interface/interface";


const bookingSchema= new Schema<IBooking>({

     user:{
        type:Types.ObjectId,
        required:[true,'user is required']
     },
     address:{
      fullname: String,
      mobile: String,
      house:String,
      landmark: String,
      street: String,
      zipcode: Number
     },
     service:{
        type:String,
        required:[true,'service is required']
     },
     date:{
        type:Date,
        required:[true,'date is required']
     },
     slot:{
        type:String,
        required:[true,'slot is required']
     },
     type:{
        type:String,
        required:[true,'type is required']
     },
     expert:{
        type:Types.ObjectId
     },
     estimatedCharge:{
        type:Number,
        required:[true,'estimated total is required']
     }, 
     totalCharge:{
        type:Number,  
     },
     status:{
        type:String,
        default:'pending'
     },
     payment:{
      type:Boolean,
      default:false
     }

})

export default model<IBooking>('booking',bookingSchema)