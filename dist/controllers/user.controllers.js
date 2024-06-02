"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postCreateUser = exports.getAllUser = void 0;
var fs_1 = require("fs");
var apiResponse_1 = require("@/utils/apiResponse");
var encryption_1 = require("@/utils/encryption");
var user_queries_1 = require("@/utils/queries/user.queries");
var uploadImage_1 = require("@/utils/uploadImage");
var getAllUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, user_queries_1.findAllUser)()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.status(201).json((0, apiResponse_1.Success)("Success load data", { data: data }))];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json((0, apiResponse_1.InternalServerError)("Something Went Wrong"))];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUser = getAllUser;
var postCreateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image, fileName, user, data, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                return [4 /*yield*/, (0, uploadImage_1.uploadImage)(image)];
            case 1:
                fileName = _b.sent();
                user = {
                    email: req.body.email,
                    name: req.body.name,
                    password: (0, encryption_1.encrypt)(req.body.password),
                    images: fileName,
                };
                return [4 /*yield*/, (0, user_queries_1.createUser)(user)];
            case 2:
                data = _b.sent();
                return [2 /*return*/, res
                        .status(201)
                        .json((0, apiResponse_1.CreatedSuccessfully)("Success create data", { data: data }))];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json((0, apiResponse_1.InternalServerError)("Something Went Wrong"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postCreateUser = postCreateUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingUser, image, fileName, user, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, (0, user_queries_1.findUser)({ id: id })];
            case 1:
                existingUser = _b.sent();
                if (!existingUser)
                    return [2 /*return*/, res.status(404).json((0, apiResponse_1.NotFound)("User Not Found"))];
                image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                return [4 /*yield*/, (0, uploadImage_1.updateImage)(existingUser.images, image)];
            case 2:
                fileName = _b.sent();
                user = {
                    email: req.body.email,
                    name: req.body.name,
                    password: (0, encryption_1.encrypt)(req.body.password),
                    images: fileName,
                };
                return [4 /*yield*/, (0, user_queries_1.updateUserById)(id, user)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).json((0, apiResponse_1.Success)("Success update data"))];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json((0, apiResponse_1.InternalServerError)("Something Went Wrong"))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, existingUser, filePath, error_4, data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, (0, user_queries_1.findUser)({ id: id })];
            case 1:
                existingUser = _a.sent();
                if (!existingUser)
                    return [2 /*return*/, res.status(404).json((0, apiResponse_1.NotFound)("User Not Found"))];
                filePath = "./public/".concat(existingUser.images);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, fs_1.promises.access(filePath)];
            case 3:
                _a.sent();
                return [4 /*yield*/, fs_1.promises.unlink(filePath)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                if (error_4.code !== "ENOENT") {
                    throw error_4;
                }
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, (0, user_queries_1.deleteUserById)(id)];
            case 7:
                data = _a.sent();
                return [2 /*return*/, res.json((0, apiResponse_1.Success)("Success delete user data", { data: data }))];
            case 8:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).json((0, apiResponse_1.InternalServerError)("Something Went Wrong"))];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controllers.js.map