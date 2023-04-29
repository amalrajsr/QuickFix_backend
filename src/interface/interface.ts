import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Request } from "express";

export interface IRequest extends Request {
  files?: any;
}

// admin
export interface IAdmin {
  _id?: ObjectId;
  name: string;
  password: string;
}

//user
export interface IUser {
  _id: ObjectId;
  name: string;
  avatar?: string;
  mobile: number;
  address?: IAddress;
  isBlocked: boolean;
  booking?: mongoose.Types.Array<ObjectId>;
}

//expert
export interface IExpert {
  _id?: ObjectId;
  name: string;
  email: string;
  mobile: number;
  password: string;
  service: ObjectId;
  serviceDetails?: IService[];
  city: ObjectId;
  isBlocked: boolean;
  works?: mongoose.Types.Array<ObjectId>;
  myWorks?:Array<any>
}

//location
export interface ILocation {
  place: string;
  pincode: number;
  isBlocked?: boolean;
}

// service
export interface IService {
  _id?: ObjectId;
  service: string;
  image: string;
  largeImage: string;
  installationCharge1Hour: number;
  installationChargeLatelyHours: number;
  repairCharge1Hour: number;
  repairChargeLatelyHours: number;
  isDeleted?: boolean;
  bookings: number;
}

// user address
export interface IAddress {
  fullname: string;
  mobile: string;
  house: string;
  street: string;
  landmark: string;
  zipcode: number;
}

// booking
export interface IBooking {
  _id: ObjectId;
  user: ObjectId;
  address: IAddress;
  service: string;
  date: Date;
  slot: string;
  type: string;
  expert: ObjectId;
  estimatedCharge: number;
  totalCharge?: number;
  status: string;
  payment: boolean;
}

//review
export interface IReview {
  _id?: ObjectId;
  user: ObjectId;
  service: ObjectId;
  booking: ObjectId;
  date: Date;
  review: string;
  rating:number
}

export interface IConversation {
  message: string;
  sender:string
}

// chat
export interface IChat {
  _id?: ObjectId;
  user: ObjectId;
  conversation: IConversation[]
}
