import { authHelpers } from "../../helper/admin/authHelper";
import asyncHandler from "express-async-handler"
import AppError from "../../utils/error";
import adminCollection from "../../model/adminModel";
import { createToken } from "../../utils/tokenGenerator";
import jwt from "jsonwebtoken";

export const adminJwtChecker = asyncHandler(async (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
     if(typeof(decoded)!=='string'){
      const admin = await adminCollection.findById(decoded.id);
      if (!admin) {
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

export const adminLogin = asyncHandler(async(req,res)=>{

    const {name,password}:{name:string,password:string}=req.body   
    const adminData= await authHelpers.findAdmin(name,password)
     console.log(adminData);
     
    if(adminData){

        const token=createToken(adminData._id)
        res.json({
            success:true,
            admin:adminData,
            token
        })

    }else{
        throw new AppError(400,'invalid credentials')
    }
    
})

