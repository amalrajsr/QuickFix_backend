import { RequestHandler } from "express";
import validator from 'validator';

// Validate MongoDB ID in Params
export const validate_id: RequestHandler = (req, res, next) => {
  if (!req.params.id || !validator.isMongoId(req.params.id)) throw new Error('invalid id')
  next();
};