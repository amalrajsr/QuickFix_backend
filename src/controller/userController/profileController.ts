import asyncHandler from "express-async-handler";
import userCollection from "../../model/userModel";
import { crudHelper } from "../../helper/crudHelper";
import cloudinary from "../../config/cloudinary";
import AppError from "../../utils/error";

export const updateProfile = asyncHandler(async (req, res) => {


 
    if(!req.body || !req.params){
        throw new AppError(400,'bad request')
    }

  const result = await crudHelper.editItem(
    userCollection,
    req.params.id,
    req.body
  );
 
  res.json({
    success: result,
  });
});

export const updateProfileImage = asyncHandler(async (req, res) => {

  if (!req.file) {
    throw Error("image upload failed");
  }
  if(!req.params.id){
    throw new Error('no id present in the request')
  }

  
  const result = await cloudinary.uploader.upload(req.file.path, {
    transformation: [
      { width: 450, height: 400, gravity: "face", crop: "fill" },
    ],
  });

  const status = await crudHelper.editItem(userCollection, req.params.id, {
    avatar: result.secure_url,
  });

  if (!status) {
    throw Error("database image updation failed");
  }

  res.json({
    success: true,
    image: result.secure_url,
  });
});
