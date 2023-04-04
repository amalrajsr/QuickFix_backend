import { usreHelpers } from "../../helper/admin/userHelper";
import asyncHandler from "express-async-handler";

export const fetchUsers= asyncHandler(async(req,res)=>{


const page:string|number= req.query?.page as string || 1
    const users= await usreHelpers.fetchAllUser(page)
    res.json({
        success:true,
        users
    })   
})

export const block_unblockUser=asyncHandler(async(req,res)=>{

    const {id}= req.body
    let statusCode:number
    const status= await usreHelpers.block_unblockUser(id)
    console.log(status);
    
     status?statusCode=200:statusCode=400     
    res.status(statusCode).json({
        updated:status
    })
    
})

