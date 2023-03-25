import userCollection from "../../model/userModel";
import {
  sendVerificationToken,
  checkVerificationToken,
} from "../../utils/otpVerfication";
import AppError from "../../utils/error";
import { createToken } from "../../utils/tokenGenerator";
import { authHelpers } from "../../helper/user/authHepler";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


export const userJwtChecker = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
   if(typeof(decoded)!=='string'){
    const user = await userCollection.findById(decoded.id);
    if (!user) {
      throw new AppError(401, "invalid token");
    } else {
      res.json({
        success:true,
      });
    }
  }
  } else {
    throw new AppError(401, "No authorization");
  }
});


export const register = asyncHandler(async (req, res) => {
  const { fullname, mobile }: { fullname: string; mobile: number } = req.body;

  const userExist = await authHelpers.findUserByMobile(mobile);

  if (userExist) {
    throw new AppError(409, "user already exists");
  } else {
    req.session.user = req.body;

    let otp_status = await sendVerificationToken(mobile);
    //    let otp_status = true

    if (otp_status) {
      res.status(200).json({
        success: true,
      });
    } else {
      throw new AppError(500, "oops! Something went wrong");
    }
  }
});

export const verify_otp = asyncHandler(async (req, res) => {

  if (req.session.user) {
    const { fullname, mobile } = req.session.user;

    const otp: string = req.body.otp;

    const data = await checkVerificationToken(otp, mobile);
    //  const data=true

    if (data) {
      const user = new userCollection({
        name: fullname,
        mobile: mobile,
      });


      await user.save();
      const token = createToken(user._id);
      res.status(201)
        .json({
          created: true,
          user,
          token,
        })
        ;
    } else {
      throw new AppError(400, "invalid otp");
    }
  } else {
    throw new AppError(500, "Something went wrong please try again later");
  }
});

export const resend_otp = asyncHandler(async (req, res) => {
  if (req.session.user) {
    const { mobile } = req.session.user;
    let otp_status = await sendVerificationToken(mobile);
    //    let otp_status = true
    if (otp_status) {
      res.status(200).json({
        success: true,
      });
    } else {
      throw new AppError(500, " Something went wrong");
    }
  } else {
    throw new AppError(500, "Something went wrong");
  }
});

export const user_login = asyncHandler(async (req, res) => {
  const mobile: number = req.body.mobile;
  const userExist = await authHelpers.findUserByMobile(mobile);
  if (userExist) {
    if (userExist.isBlocked) {
      throw new AppError(401, "your account has been blocked");
    } else {
      const otp_status = await sendVerificationToken(mobile);
      if (otp_status) {
        res
          .json({
            success: true,
          })
          .status(200);
      }
    }
  } else {
    throw new AppError(400, "Something went wrong please try again later");
  }
});

export const verify_login_otp = asyncHandler(async (req, res) => {
  const { mobile, otp }: { mobile: number; otp: string } = req.body;

  const otp_status = await checkVerificationToken(otp, mobile);
  if (otp_status) {
    const user = await authHelpers.findUserByMobile(mobile);
    if (!user) throw new AppError(400, "something went wrong");
    const token = createToken(user._id);
    res.json({
      success: true,
      user,
      token,
    });
  } else {
    throw new AppError(400, "Invalid OTP");
  }
});
