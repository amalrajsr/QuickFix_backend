import userCollection from "../../model/userModel";
import {
  sendVerificationToken,
  checkVerificationToken,
} from "../../utils/otpVerfication";
import AppError from "../../utils/error";
import { createToken } from "../../utils/tokenGenerator";
import { authHelpers } from "../../helper/user/authHepler";
import asyncHandler from "express-async-handler";




export const register = asyncHandler(async (req, res) => {
  const { name, mobile }: { name: string; mobile: number } = req.body;

  const userExist = await authHelpers.findUserByMobile(mobile);
   
  if (userExist) {
    throw new AppError(409, "user already exists");
  } else {
   
      const otp_status = await sendVerificationToken(mobile);
      // const otp_status = true
    if (otp_status) {
      res.json({
        success: true,
      });
    } else {
      throw new AppError(500, "oops! Something went wrong");
    }
  }
});

export const verify_otp = asyncHandler(async (req, res) => {

 

 
    const { name, mobile,otp } = req.body;
     if(!name || !mobile || !otp){
      throw new AppError(400,'bad request')
     }

    const data = await checkVerificationToken(otp, mobile);
    //  const data=true

    if (data) {
      const user = new userCollection({
        name: name,
        mobile: mobile,
        avatar:'https://res.cloudinary.com/dsw9tifez/image/upload/v1680511516/quickfix/static/profile_eil3c6.jpg'
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

});

export const resendOtp = asyncHandler(async (req, res) => {

  if (req.body) {
    const { mobile } = req.body;
     const otp_status = await sendVerificationToken(mobile);
  //  const otp_status=true
    if (otp_status) {
      res.status(200).json({
        success: true,
      });
    } else {
      throw new Error("Something went wrong");
    }
  } else {
    throw new Error("Something went wrong");
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const mobile: number = req.body.mobile;
  const userExist = await authHelpers.findUserByMobile(mobile);

  if (userExist) {
    if (userExist.isBlocked) {
      throw new AppError(401, "your account has been blocked");
    } else {
       const otp_status = await sendVerificationToken(mobile);
      // const otp_status = true

      if (otp_status) {
        res
          .json({
            success: true,
          })
         
      }
    }
  } else {
    throw new AppError(400, "Something went wrong please try again later");
  }
});

export const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { mobile, otp }: { mobile: number; otp: string } = req.body;

  const otp_status = await checkVerificationToken(otp, mobile);
  // const otp_status=true
  if (otp_status) {
    const user = await authHelpers.findUserByMobile(mobile);
    if (!user) throw new AppError(400, "something went wrong");
    //creating jwt
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
