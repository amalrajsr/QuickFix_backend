import asyncHandler from "express-async-handler";
import { serviceHelpers } from "../../helper/admin/serviceHelper";
import { IService } from "../../model/serviceModel";
import AppError from "../../utils/error";
import cloudinary from "../../config/cloudinary";
export const addService = asyncHandler(
  async (req, res): Promise<void> => {    
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        transformation: [
          { width: 450, height: 400, gravity: "face", crop: "fill" },
        ],
      });

      if (result) {
        const name=req.body.service.toUpperCase()
        const service: IService = { ...req.body,service:name, image: result.secure_url };
        const status = await serviceHelpers.addService(service);
        if (!status) throw new Error("something went wrong");
        res.status(200).json({
          success: status,
        });
      } else {
        throw Error("something went wrong");
      }
    } else {
      throw new AppError(500, "something went wrong");
    }
  }
);

export const fetchServices=asyncHandler(async(req,res)=>{

    const services=await serviceHelpers.fetchServices()
     
    res.status(200).json({
      success:true,
      services
    })
    
    
})

export const fetchSingleService=asyncHandler(async(req,res)=>{

  const service= await serviceHelpers.fetchSingleService(req.params.id)
  
  if(!service){
    throw new AppError(400,'invalid id')
  }
  res.status(200).json({
    success:true,
    data:service
  })
  
})

export const editService=asyncHandler(async(req,res)=>{

  const name=req.body.service.toUpperCase()
  let serviceData:IService={...req.body,service:name}
  if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path, {
      transformation: [
        { width: 500, height: 500, gravity: "face", crop: "fill" },
      ],
    });
    serviceData={...serviceData,image:result.secure_url}
  }

  const status= await serviceHelpers.editService(req.params.id,serviceData)
  if(!status){
    throw new AppError(500, 'something went wrong,please try again later')
  }else{

    res.status(200).json({success:true})
  }
  
  
})


export const deleteService=asyncHandler(async(req,res)=>{
    if(req.params?.id){
      let statusCode:number
   const status= await serviceHelpers.deleteService(req.params.id)
   status?statusCode=200:statusCode=400     

   res.status(statusCode).json({
    updated:status
  })
}else{
  throw new AppError(400,'invalid credentials')
}
})


