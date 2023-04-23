import { dashboardHelper } from "../../helper/admin/dashboardHelper"
import asyncHandler from "express-async-handler"


export const getTotals = asyncHandler(async(req,res)=>{

    const result= await dashboardHelper.getTotal()
   
    res.json({
        success:true,
        result
    })
})

export const getCount =asyncHandler(async(req,res)=>{
    const result = await dashboardHelper.getCount()
    res.json({
        success:true,
        result
    })
})