import asyncHandler from "express-async-handler";
import bookingCollection from "../../model/bookingModel";
import { crudHelper } from "../../helper/crudHelper";
import { ObjectId } from "bson";

export const viewWorks = asyncHandler(async (req, res) => {
  let success;

  const filter = [
    { $match: { expert: new ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $sort:{_id:-1} },
  ];
  const works = await crudHelper.fetchItems(bookingCollection, filter, true);

  works.length > 0 ? (success = true) : (success = false);
  res.json({
    success,
    works,
  });
});

export const updateWorkPayment = asyncHandler(async (req, res) => {
  const result = await crudHelper.editItem(
    bookingCollection,
    req.params.id,
    req.body
  );

  res.json({
    success: result,
  });
});

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const result = await crudHelper.editItem(bookingCollection, req.params.id, {
    payment: true,
    status: "completed",
  });
  if (!result) throw new Error("payment updation failed");

  res.json({
    success: true,
  });
});
