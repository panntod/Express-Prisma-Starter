import { promises as fs } from "fs";

import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import {
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
  Success,
} from "@/utils/apiResponse";
import { encrypt } from "@/utils/encryption";
import {
  createUser,
  deleteUserById,
  findAllUser,
  findUser,
  updateUserById,
} from "@/utils/queries/user.queries";
import { uploadImage, updateImage } from "@/utils/uploadImage";

export const getAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = await findAllUser();

    return res.status(201).json(Success("Success load data", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const postCreateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const image = req.files?.image as UploadedFile;
    const fileName = await uploadImage(image);

    const user = {
      email: req.body.email,
      name: req.body.name,
      password: encrypt(req.body.password),
      images: fileName,
    };

    const data = await createUser(user);

    return res
      .status(201)
      .json(CreatedSuccessfully("Success create data", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const existingUser = await findUser({ id });
    if (!existingUser) return res.status(404).json(NotFound("User Not Found"));

    const image = req.files?.image as UploadedFile;
    const fileName = await updateImage(existingUser.images, image);

    const user = {
      email: req.body.email,
      name: req.body.name,
      password: encrypt(req.body.password),
      images: fileName,
    };

    await updateUserById(id, user);

    return res.status(200).json(Success("Success update data"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    const existingUser = await findUser({ id });

    if (!existingUser) return res.status(404).json(NotFound("User Not Found"));

    const filePath = `./public/${existingUser.images}`;

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    const data = await deleteUserById(id);
    return res.json(Success("Success delete user data", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};
