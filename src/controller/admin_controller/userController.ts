import { userServices } from "../../services/admin/userService";
import asyncHandler from "express-async-handler";

export const fetchUsers= asyncHandler(async(req,res)=>{


const page:string|number= req.query?.page as string || 1
    const users= await userServices.fetchAllUser(page)
    res.json({
        success:true,
        users
    }).status(200)      
})

export const block_unblockUser=asyncHandler(async(req,res)=>{



    const {id}= req.body
    let statusCode:number
    const status= await userServices.block_unblockUser(id)
     status?statusCode=200:statusCode=400     
    res.status(statusCode).json({
        updated:status
    })
    
})

