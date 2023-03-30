import { authHelpers } from "../../helper/admin/authHelper";
import asyncHandler from "express-async-handler"
import AppError from "../../utils/error";
import { createToken } from "../../utils/tokenGenerator";

export const adminLogin = asyncHandler(async(req,res)=>{

    const {name,password}:{name:string,password:string}=req.body   
    const adminData= await authHelpers.findAdmin(name,password)
     
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

