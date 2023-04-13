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
      }},{$lookup: {
        from: "experts",
        localField: "expert",
        foreignField: "_id",
        as: "expert",
      }}]
    const result= await crudHelper.fetchItems(bookingCollection,filter,aggregate)
    
    res.json({
      success:true,
      bookings:result
    })
})

export const assignWorker =asyncHandler(async(req,res)=>{

  const booking={...req.body,status:'active'}
  const result = await crudHelper.editItem(bookingCollection,req.params.id,booking)
  res.json({
    success:result
  })
})

