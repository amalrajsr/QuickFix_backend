import asyncHandler from "express-async-handler";
import AppError from "./error";
import {Schema} from 'yup';
import { RequestHandler } from "express-serve-static-core";


export function validateBody<T> (schema: Schema<T>): RequestHandler {
 return asyncHandler(async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (err: any) {
      throw new AppError(400,err.errors[0]);
    }
  })}