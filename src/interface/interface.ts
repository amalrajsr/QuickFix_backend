import { Request } from "express";
export default interface IUserData{
    fullname?:string,
    mobile:number
}

export interface IRequest extends Request {
    files?: any;
  }
