import asyncHandler from "express-async-handler";
import bookingCollection from "../../model/bookingModel";
import { crudHelper } from "../../helper/crudHelper";
import { bookingHelper } from "../../helper/user/bookingHelper";
import { IBooking } from "../../interface/interface";

export const addBooking =asyncHandler(async(req,res)=>{

    const newDate=req.body.date.split('T')[0]
    const booking={...req.body,date:newDate}
    const result:false|IBooking= await crudHelper.addItem(bookingCollection,booking)
    if(!result){
        throw Error('error occured while booking')
    }
    const status= await bookingHelper.addBooking(req.body.user,result._id)
    console.log(status)

    res.json({
        success:true
    })
})


