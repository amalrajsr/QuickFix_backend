import mongoose  from "mongoose";
import { ObjectId } from "bson";
import { Request } from "express";

export default interface IUserData{
    fullname?:string,
    mobile:number
}

export interface IRequest extends Request {
    files?: any;
  }

  export interface IAdmin{
    name:string,
    password:string
}

  
export interface ILocation{

    place:string,
    pincode:number,
    isBlocked?:boolean
}

// service 
  export interface IService{
    _id?:ObjectId,
    service:string,
    image:string,
    largeImage:string,
    installationCharge1Hour:number,
    installationChargeLatelyHours:number,
    repairCharge1Hour:number,
    repairChargeLatelyHours:number,
    isDeleted?:boolean
}


// user address 
  export interface IAddress{
    name:string
    mobile:string,
    street:string,
    landmark:string,
    address:string,
    zipCode:number
}

//user 
export  interface IUser{
    _id:ObjectId,
    name:string,
    avatar?:string,
    mobile:number,
    address?:IAddress,
    isBlocked:boolean,
    isExpert:boolean,
    booking?:mongoose.Types.Array<ObjectId>,
    expertCategory?:string,
    expertRating?:number,  
    expertWorks?:mongoose.Types.Array<ObjectId>
}


// booking 
  export interface IBooking{
    _id: ObjectId,
    user:ObjectId,
    address:IAddress,
    service:string,
    date: Date,
    slot:string
    type:string,
    expert:ObjectId,
    estimatedCharge:number,
    totalCharge?:number,
    status:string,

}