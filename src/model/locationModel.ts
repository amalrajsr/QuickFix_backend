import {Schema,model} from "mongoose";

export interface ILocation{

    place:string,
    pincode:number,
    isBlocked?:boolean
}

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