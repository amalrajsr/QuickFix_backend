import asyncHandler from "express-async-handler";
import bookingCollection from "../../model/bookingModel";
import { crudHelper } from "../../helper/crudHelper";
import { bookingHelper } from "../../helper/user/bookingHelper";
import { IBooking } from "../../interface/interface";
import { ObjectId } from "bson";
import AppError from "../../utils/error";
import { instance } from "../../config/razorpay";
import crypto from "crypto";
import { serviceHelper } from "../../helper/service/serviceHelper";
import locationCollection from "../../model/locationModel";


export const fetchLocations = asyncHandler(async (req, res) => {
  
  const result = await crudHelper.fetchItems(locationCollection,{isBlocked:false});

  res.json({
    success: true,
    locations: result,
  });
});

export const addBooking = asyncHandler(async (req, res) => {
  const Experts = await bookingHelper.checkExperts(
    req.body.service,
    +req.body.address.zipcode
  );

  if (Experts.length > 0) {
    const freeExperts = Experts.filter((expert) => {
      return (
        expert.myWorks?.every(
          (works) =>
            new Date(works.date).getTime() !== new Date(req.body.date).getTime()
        ) && expert
      );
    });

    if (freeExperts.length < 1)
      throw new AppError(400, "No experts available for this date");
  }

  const newDate = req.body.date;
  const booking = { ...req.body, date: newDate };
   const result = await crudHelper.addItem(bookingCollection, booking);

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
  const filter = [
    { $match: { user: new ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "experts",
        localField: "expert",
        foreignField: "_id",
        as: "expert",
      },
    },
  ];
  const bookings = await crudHelper.fetchItems(bookingCollection, filter, true);
  bookings.length > 0 ? (success = true) : (success = false);
  res.json({
    success,
    bookings,
  });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await crudHelper.fetchSingleItem(bookingCollection, {
    _id: req.params.id,
  });
  if (!booking) throw new Error("bad request");

  const date = new Date();
  const { date: bookedDate } = booking as IBooking;

  if (date > bookedDate || date === bookedDate) {
    throw new AppError(400, "cannot cancel the service ");
  }

  const status = await crudHelper.editItem(bookingCollection, req.params.id, {
    status: "cancelled",
  });

  res.json({
    success: status,
  });
});

export const payBooking = asyncHandler(async (req, res) => {
  const result = await crudHelper.fetchSingleItem(bookingCollection, {
    _id: req.body.id,
  });
  if (!result) {
    throw new Error("bad request, invalid booking Id");
  }
  const receiptId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // random reciept id generating
  const options = {
    amount: result.totalCharge * 100, // amount in smallest currency unit
    currency: "INR",
    receipt: `receipt_order_${receiptId}`,
    payment_capture: 1,
  };

  const order = await instance.orders.create(options);
  if (!order) throw new Error("something went wrong");

  res.json({
    sucess: true,
    order,
  });
});

export const paymentSuccess = asyncHandler(async (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    bookingId,
    service,
  } = req.body;

  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET as string)
    .update(`${orderCreationId}|${razorpayPaymentId}`)
    .digest("hex");

  if (signature !== razorpaySignature) {
    throw new AppError(400, "Transcation is not legit");
  }
  const result = await crudHelper.editItem(bookingCollection, bookingId, {
    payment: true,
    status: "completed",
  });
  if (!result) throw new Error("booking collection updation failed");

  const serviceResult = await serviceHelper.updateBookingCount(service);

  res.json({
    success: true,
    serviceUpdated: serviceResult,
  });
});
