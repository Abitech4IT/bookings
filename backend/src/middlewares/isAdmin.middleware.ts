import { AppError } from "@helpers/appError";
import { NextFunction, Response, RequestHandler } from "express";
import { CustomRequest } from "./types";

export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
