import {Schema,model} from "mongoose";
import { ILocation } from "../interface/interface";

const locationModel= new Schema<ILocation>({
    place:{
      type:String,
      required:[true,'place is required']
    },
    pincode:{
        type:Number,
        required:[true,'pincode is required'],
        min:[6,'6 digits needed'],
        unique:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})


export default model('location',locationModel)