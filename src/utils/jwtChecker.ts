import asyncHandler from "express-async-handler"
import AppError from "../utils/error";
import adminCollection   from "../model/adminModel";
import userCollection from '../model/userModel'
import {IAdmin ,IUser} from '../interface/interface'
import jwt from "jsonwebtoken"
import { Model } from "mongoose";

export const jwtChecker = asyncHandler(async (req, res) => {
//IUser|IAdmin
    let collection:Model<any>
    switch(req.query.role){
        case('user'):
        collection=userCollection
        break;
        case('admin'):
        collection=adminCollection
        break;
        default:
            throw new AppError(400,'bad request')

    }
    // const collection=req.query.role
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
     if(typeof(decoded)!=='string'){
      const user = await collection.findById(decoded.id);
      if (!user) {
        throw new AppError(401, "invalid token");
      } else {
        res.json({
          success:true,
        });
      }
    }
    } else {
      throw new AppError(401, "No authorization");
    }
  });