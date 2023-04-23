import asyncHandler from "express-async-handler";
import expertCollection from "../../model/expertModel";
import { crudHelper } from "../../helper/crudHelper";
import { createToken } from "../../utils/tokenGenerator";
import AppError from "../../utils/error";
import bcrypt from "bcrypt";
import {
  checkVerificationToken,
  sendVerificationToken,
} from "../../utils/otpVerfication";

export const expertLogin = asyncHandler(async (req, res) => {
  const result = await crudHelper.fetchSingleItem(
    expertCollection,
    [
      { $match: { email: req.body.email } },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
    ],
    true
  );

  if (!result) {
    throw new AppError(400, "invalid email or passsword");
  }
  if (result[0].isBlocked) {
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
    mobile: result[0].mobile,
    service: result[0].serviceDetails[0].service,
    city: result[0].city,
    status: result[0].status,
    isBlocked: result[0].isBlocked,
    works: result[0].works,
  };
  const token = createToken(result[0]._id);
  res.json({
    success: true,
    expert,
    token,
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { mobile }: { mobile: number } = req.body;
  const expertExists = await crudHelper.fetchSingleItem(expertCollection, {
    mobile: mobile,
  });
  if (!expertExists) throw new Error("expert not found");
  //const otp_status = await sendVerificationToken(mobile);
  const otp_status = true;
  if (!otp_status) throw new Error("expert forgot password otp sending failed");

  res.json({
    success: true,
    expertID: expertExists._id,
  });
});

export const forgotPasswordOtpVerify = asyncHandler(async (req, res) => {
  const { mobile, otp }: { mobile: number; otp: string } = req.body;
  //const otp_status = await checkVerificationToken(otp, mobile);
  const otp_status = true;
  if (!otp_status) throw new AppError(400, "invalid OTP");

  res.json({
    success: true,
  });
});

export const resendOtp = asyncHandler(async (req, res) => {
  if (!req.body) throw new Error("invalid request");

  const { mobile } = req.body;
  const otp_status = await sendVerificationToken(mobile);
  //  const otp_status=true
  if (!otp_status) throw new Error("resend otp failed");
  res.json({
    success: true,
  });
});

export const forgotPasswordReset = asyncHandler(async (req, res) => {

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
