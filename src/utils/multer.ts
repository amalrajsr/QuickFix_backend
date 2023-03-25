import  cloudinary from "../config/cloudinary";
import { Request } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import AppError from "./error";

interface Params {
    folder: string;
  }

const Cloudstorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "quickfix/services",
    }as Params,
  });

const uploadCloudinary = multer({
    storage: Cloudstorage,
    // image validation
    fileFilter:(req: Request,file: { mimetype: string; },callback)=>{ 
        if( ['image/jpeg','image/jpg','image/png'].includes(file.mimetype)){
            callback(null,true)
        }
        else{
            return callback( new AppError(400,'only jpg jpeg png and gif files are allowed '));

            

        }
    }
    
})

export default uploadCloudinary