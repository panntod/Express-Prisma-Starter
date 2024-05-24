import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { InternalServerError, Success, Unauthorize } from "@/utils/apiResponse";
import { compareHash } from "@/utils/encryption";
import { findUser } from "@/utils/queries/user.queries";

export const Logout = (_: Request, res: Response): Response => {
  return res.clearCookie("token").json(Success("Successfully Logout"));
};

export const CurrentSession = (req: Request, res: Response): Response => {
  return res.json(Success("Success load current user", { data: req.token }));
};

export const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await findUser({ email: req.body.email });

    if (!user) {
      return res.status(401).json(Unauthorize("Incorrect Email or Password"));
    }

    const match = compareHash(req.body.password, user?.password);

    if (!match) {
      return res
        .status(401)
        .json(Unauthorize("Incorrect Password or Password"));
    }

    const data = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
    };

    const token = jwt.sign(data, process.env.APP_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res.json(
      Success("Login success", {
        logged: true,
        token,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(InternalServerError("Incorrect Email or Password"));
  }
};
