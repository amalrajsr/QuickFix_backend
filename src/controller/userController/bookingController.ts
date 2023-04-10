import asyncHandler from "express-async-handler";
import bookingCollection from "../../model/bookingModel";
import { crudHelper } from "../../helper/crudHelper";
import { bookingHelper } from "../../helper/user/bookingHelper";
import { IBooking } from "../../interface/interface";
import { ObjectId } from "bson";
import AppError from "../../utils/error";
export const addBooking = asyncHandler(async (req, res) => {
  const newDate = req.body.date;
  const booking = { ...req.body, date: newDate };
  const result: false | IBooking = await crudHelper.addItem(
    bookingCollection,
    booking
  );
  if (!result) {
    throw Error("error occured while booking");
  }
  const status = await bookingHelper.addBooking(req.body.user, result._id);

  if (!status) {
    throw Error("error occured while updating user booking");
  }

  res.json({
    success: true,
  });
});

export const viewBookings = asyncHandler(async (req, res) => {
  let success;
  const filter = { user: new ObjectId(req.params.id) };
  const bookings = await crudHelper.fetchItems(bookingCollection, filter);
  bookings.length > 0 ? (success = true) : (success = false);
  res.json({
    success,
    bookings,
  });
});

export const cancelBooking = asyncHandler(async (req, res) => {
 
  const booking = await crudHelper.fetchSingleItem(
    bookingCollection,
    {_id:  req.params.id}
  );
  if (!booking) {
    throw new Error("bad request");
  }

  const date = new Date();
  const bookedDate = booking.date;

  if (date > bookedDate || date === bookedDate) {
    throw new AppError(400, "cannot cancel the service ");
  }

  const status= await crudHelper.editItem(bookingCollection,req.params.id,{status:'cancelled'})
  
  res.json({
    success: status,
  });
});
