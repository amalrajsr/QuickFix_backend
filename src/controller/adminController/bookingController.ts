import asyncHandler from "express-async-handler";
import { crudHelper } from "../../helper/crudHelper";
import bookingCollection from "../../model/bookingModel";

export const fetchBookings = asyncHandler(async(req,res)=>{

    const aggregate=true
    const filter=[{$lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },}]
    const result= await crudHelper.fetchItems(bookingCollection,filter,aggregate)
    
    res.json({
      success:true,
      bookings:result
    })
})