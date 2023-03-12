import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import AppError from "../utils/error";

export const userAuthorization: RequestHandler = asyncHandler(
  async (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err, decodedToken) => {
          if (err) {
            console.log(err);
            throw new AppError(401, "User is not authorized");
          } else {
            console.log(decodedToken);

            next();
          }
        }
      );
    } else {
      throw new AppError(401, "User is not authorized");
    }
  }
);
