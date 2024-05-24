import { Router } from "express";
import fileUpload from "express-fileupload";

import { CurrentSession, Login, Logout } from "@/controllers/auth.controllers";
import {
  deleteUser,
  getAllUser,
  postCreateUser,
  updateUser,
} from "@/controllers/user.controllers";
import { auth } from "@/middleware/auth";

const router = Router();

// UPLOAD IMAGE
const file = fileUpload({
  useTempFiles: false,
  tempFileDir: "bulk_temp_file/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

// MAIN ROUTER
router.post("/login", Login);
router.post("/register", file, postCreateUser);

router.use(auth);
router.get("/", getAllUser);
router.get("/profile", CurrentSession);
router.put("/:id", file, updateUser);
router.delete("/logout", Logout);
router.delete("/:id", deleteUser);

export default router;
