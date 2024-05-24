import { promises as fs } from "fs";

import { UploadedFile } from "express-fileupload";

export const uploadImage = async (image: UploadedFile): Promise<string> => {
  if (!image) {
    throw new Error("Image file is required");
  }

  const fileName = `${Date.now()}-${image.name}`;
  const filePath = `./public/${fileName}`;

  await fs.writeFile(filePath, image.data);

  return fileName;
};

export const updateImage = async (
  existingFileName: string | undefined,
  newImage: UploadedFile
): Promise<string> => {
  let fileName = existingFileName;

  if (newImage) {
    const oldFilePath = `./public/${existingFileName}`;

    try {
      await fs.access(oldFilePath);
      await fs.unlink(oldFilePath);
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    fileName = `${Date.now()}-${newImage.name}`;
    const newFilePath = `./public/${fileName}`;

    await fs.writeFile(newFilePath, newImage.data);
  }

  return fileName!;
};
