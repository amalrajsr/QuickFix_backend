import asyncHandler from "express-async-handler";
import expertCollection from "../../model/expertModel";
import { crudHelper } from "../../helper/crudHelper";


export const updateExpertProfile=asyncHandler(async(req,res)=>{


    const result= await crudHelper.editItem(expertCollection,req.params.id,req.body)
    res.json({
        success: result,
      });
})
