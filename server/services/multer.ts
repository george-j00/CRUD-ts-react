import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    // Pass a new Error instance if the file type is not supported
    cb(new Error("File type is not supported"));
    return;
  }
  // Provide null to indicate no error and allow the file
  cb(null, true);
};

export default multer({
  storage: multer.diskStorage({}),
  fileFilter,
});
