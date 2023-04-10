import asyncHandler from "express-async-handler";
import expertCollection from "../../model/expertModel";
import { crudHelper } from "../../helper/crudHelper";
import { createToken } from "../../utils/tokenGenerator";
import AppError from "../../utils/error";
import bcrypt from "bcrypt";

export const expertLogin = asyncHandler(async (req, res) => {
  const result = await crudHelper.fetchSingleItem(expertCollection,[{$match:{email:req.body.email}},{$lookup:{from:'services',localField:'service',foreignField:'_id', as:'serviceDetails'}}],true);

  if (!result) {
    throw new AppError(400, "invalid email or passsword");
  }
  if (result.isBlocked) {
    throw new AppError(401, "your account has been blocked by admin");
  }
  const passwordMatch = await bcrypt.compare(
    req.body.password,
    result[0].password
  );
  if (!passwordMatch) {
    throw new AppError(400, "invalid email or passsword");
  }
  const expert = {
    _id: result[0]._id,
    name: result[0].name,
    email: result[0].email,
    mobile:result[0].mobile,
    service: result[0].serviceDetails[0].service,
    city: result[0].city,
    status: result[0].status,
    isBlocked: result[0].isBlocked,
    works:result[0].works
  };
  const token = createToken(result._id);
  res.json({
    success: true,
    expert,
    token,
  });
});
