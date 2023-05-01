import asyncHandler from "express-async-handler";
import expertCollection from "../../model/expertModel";
import { crudHelper } from "../../helper/crudHelper";
import bcrypt from "bcrypt";
import AppError from "../../utils/error";
import { ObjectId } from "bson";

export const updateExpertProfile = asyncHandler(async (req, res) => {
  const result = await crudHelper.editItem(
    expertCollection,
    req.params.id,
    req.body
  );
  res.json({
    success: result,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await crudHelper.fetchSingleItem(expertCollection, {
    _id: req.params.id,
  });
  if (!result)
    throw new Error("failed to fetch expert data while password reset");
  const passwordMatch = await bcrypt.compare(
    req.body.currentPass,
    result.password
  );

  if (!passwordMatch) throw new AppError(400, "current password mismatch");

  if (req.body.NewPass !== req.body.ReNewPass)
    throw new AppError(400, "password mismatch");

  const passswordHash = await bcrypt.hash(req.body.NewPass, 10);

  if (!passswordHash) throw new Error("password hash failed");

  const updatePassword = await crudHelper.editItem(
    expertCollection,
    req.params.id,
    { password: passswordHash }
  );

  if (!updatePassword) throw new Error("password updation failed");

  res.json({
    success: true,
  });
});

export const profileDetails = asyncHandler(async (req, res) => {
  const aggregate = true;
  const filter = [
    { $match: { _id: new ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "bookings",
        localField: "works",
        foreignField: "_id",
        as: "works",
      },
    },
    {
      $match: {
        $and: [
          { "works.date": { $lt: new Date() } },
          {
            "works.date": {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
        ],
      },
    },
    {
      $project: {
        name: 1,
        works: 1,
      },
    },
  ];
  const result = await crudHelper.fetchSingleItem(
    expertCollection,
    filter,
    aggregate
  );

  if(result.length<1) throw new Error()
  
  res.json({ success: true, result });

});
