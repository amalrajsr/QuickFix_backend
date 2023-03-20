import { userServices } from "../../services/admin/userService";
import asyncHandler from "express-async-handler";

export const fetchUsers= asyncHandler(async(req,res)=>{

    const users= await userServices.fetchAllUser()
    res.json({
        success:true,
        users
    })      
})