import asyncHandler from "express-async-handler";
import { crudHelper } from "../../helper/crudHelper";
import bookingCollection from "../../model/bookingModel";
import { workHelper } from "../../helper/expert/workHelper";

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
  
  const result =await Promise.all([  crudHelper.editItem(bookingCollection,req.params.id,booking), workHelper.addWorks(req.body.expert,req.params.id) ])

  if(!result[0] ) throw Error('assign worker failed')
  
  res.json({
    success:result[0]
  })
})

