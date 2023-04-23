import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AppError from "../utils/error";
import userCollection from "../model/userModel";
import adminCollection from "../model/adminModel";
import expertCollection from "../model/expertModel";
import { Model } from "mongoose";

export const authorization = asyncHandler(async (req, res, next) => {
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    req.query.role
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "string") {
      let collection=Model<any>
      switch(req.query.role){
        case('user'):
        collection=userCollection
        break;
        case('admin'):
        collection=adminCollection
        break;
        case('expert'):
        collection=expertCollection
      }
      const user = await collection.findOne({_id:decoded.id,isBlocked:false});
      if (!user) {
        throw new AppError(401, "invalid token");
      } else {
        next();
      }
    } else {
      throw new AppError(401, "No authorization");
    }
  } else {
    throw new AppError(401, "No authorization");
  }
});



