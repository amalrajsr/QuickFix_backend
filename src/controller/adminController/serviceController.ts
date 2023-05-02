import asyncHandler from "express-async-handler";
import { serviceHelpers } from "../../helper/admin/serviceHelper";
import { IService } from "../../interface/interface";
import AppError from "../../utils/error";
import cloudinary from "../../config/cloudinary";
import { IRequest } from "../../interface/interface";

export const addService = asyncHandler(async (req, res) => {
  const serviceExists = await serviceHelpers.fetchSingleService({
    service: req.body.service.toUpperCase(),
  });

  if (serviceExists) throw new AppError(409, "service already exist");
  // throws error is req.files is undefined or not an array or array of length 0
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    throw new AppError(500, "something went wrong");
  }

  const images = req.files.map(async (file, i) => {
    if (i < 1) {
      return await cloudinary.uploader.upload(file.path, {
        transformation: [
          { width: 500, height: 450, gravity: "face", crop: "fill" },
        ],
      });
    } else {
      return await cloudinary.uploader.upload(file.path);
    }
  });

  const results = await Promise.all(images);

  if (results) {
    const name = req.body.service.toUpperCase();
    const service: IService = {
      ...req.body,
      service: name,
      image: results[0].secure_url,
      largeImage: results[1].secure_url,
    };
    const status = await serviceHelpers.addService(service);
    if (!status) throw new Error("something went wrong");
    res.status(200).json({
      success: status,
    });
  } else {
    throw Error("something went wrong");
  }
});

export const fetchServices = asyncHandler(async (req, res) => {
  const services = await serviceHelpers.fetchServices();

  res.status(200).json({
    success: true,
    services,
  });
});

export const fetchSingleService = asyncHandler(async (req, res) => {
  const service = await serviceHelpers.fetchSingleService({
    _id: req.params.id,
  });

  if (!service) {
    throw new AppError(400, "invalid id");
  }
  res.status(200).json({
    success: true,
    data: service,
  });
});

export const editService = asyncHandler(async (req: IRequest, res) => {
  const name = req.body.service.toUpperCase();
  let serviceData: IService = { ...req.body, service: name };
  const serviceExists = await serviceHelpers.fetchSingleService({
    service: name,
  });

  if (serviceExists) throw new AppError(409, "service already exist");
  if (req.files.image) {
    const result = await cloudinary.uploader.upload(req.files.image[0].path, {
      transformation: [
        { width: 450, height: 400, gravity: "face", crop: "fill" },
      ],
    });

    serviceData = { ...req.body, image: result.secure_url };
  }
  if (req.files.largeImage) {
    serviceData = { ...serviceData, largeImage: req.files.largeImage[0].path };
  }

  const status = await serviceHelpers.editService(req.params.id, serviceData);
  if (!status) {
    throw new AppError(500, "something went wrong,please try again later");
  } else {
    res.status(200).json({ success: true });
  }
});

export const deleteService = asyncHandler(async (req, res) => {
  if (req.params?.id) {
    let statusCode: number;
    const status = await serviceHelpers.deleteService(req.params.id);
    status ? (statusCode = 200) : (statusCode = 400);

    res.status(statusCode).json({
      updated: status,
    });
  } else {
    throw new AppError(400, "invalid credentials");
  }
});
