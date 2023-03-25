import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AppError from "../utils/error";
import userCollection from "../model/userModel";
import adminCollection from "../model/adminModel";
import mongoose from "mongoose";

export const userAuthorization = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "string") {
      const user = await userCollection.findById(decoded.id);
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

export const adminAuthorization = asyncHandler(async (req, res, next) => {
 

  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
      
      
    if (typeof decoded !== "string") {
  
      const admin = await adminCollection.findOne({_id:decoded.id });
      if (!admin) {
        throw new AppError(400, "invalid token");
      } else {
        next();
      }
    } else {
      throw new AppError(400, "No authorization");
    }
  } else {
    throw new AppError(401, "No authorization");
  }
});
