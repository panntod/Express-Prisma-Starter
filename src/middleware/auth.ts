import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

import { RequestWithSession, Token } from "@/types/middleware";
import { Unauthorize } from "@/utils/apiResponse";

declare global {
  namespace Express {
    interface Request {
      token?: Token;
    }
  }
}

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json(Unauthorize("Unauthorized"));
    }

    const secret = process.env.APP_SECRET;
    if (!secret) {
      throw new Error("APP_SECRET is not defined");
    }

    const decoded = verify(token, secret) as Token;
    (req as RequestWithSession).token = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json(Unauthorize("Token Has Been Expired"));
    } else {
      return res.status(401).json(Unauthorize("Unauthorized"));
    }
  }
};
