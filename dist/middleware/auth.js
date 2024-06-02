"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var apiResponse_1 = require("@/utils/apiResponse");
var auth = function (req, res, next) {
    var _a;
    try {
        var token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
        if (!token) {
            return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized"));
        }
        var secret = process.env.APP_SECRET;
        if (!secret) {
            throw new Error("APP_SECRET is not defined");
        }
        var decoded = (0, jsonwebtoken_1.verify)(token, secret);
        req.token = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(401).json((0, apiResponse_1.Unauthorize)("Token Has Been Expired"));
        }
        else {
            return res.status(401).json((0, apiResponse_1.Unauthorize)("Unauthorized"));
        }
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map