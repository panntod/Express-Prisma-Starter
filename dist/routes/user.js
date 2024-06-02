"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var auth_controllers_1 = require("@/controllers/auth.controllers");
var user_controllers_1 = require("@/controllers/user.controllers");
var auth_1 = require("@/middleware/auth");
var router = (0, express_1.Router)();
// UPLOAD IMAGE
var file = (0, express_fileupload_1.default)({
    useTempFiles: false,
    tempFileDir: "bulk_temp_file/",
    limits: { fileSize: 10 * 1024 * 1024 },
});
// MAIN ROUTER
router.post("/login", auth_controllers_1.Login);
router.post("/register", file, user_controllers_1.postCreateUser);
router.use(auth_1.auth);
router.get("/", user_controllers_1.getAllUser);
router.get("/profile", auth_controllers_1.CurrentSession);
router.put("/:id", file, user_controllers_1.updateUser);
router.delete("/logout", auth_controllers_1.Logout);
router.delete("/:id", user_controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map