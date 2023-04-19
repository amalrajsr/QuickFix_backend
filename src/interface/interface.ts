import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Request } from "express";

export interface IRequest extends Request {
  files?: any;
}

// admin
export interface IAdmin {
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
  service: ObjectId ;
  serviceDetails?:IService[]
  city: string;
  isBlocked: boolean;
  status: boolean;
  works?: mongoose.Types.Array<ObjectId>;
}

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
  bookings:number
}

// user address
export interface IAddress {
  name: string;
  mobile: string;
  street: string;
  landmark: string;
  address: string;
  zipCode: number;
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


