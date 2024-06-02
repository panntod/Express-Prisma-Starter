"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteUserById = exports.updateUserById = exports.findUser = exports.findAllUser = void 0;
var prisma_1 = __importDefault(require("@/lib/prisma"));
var findAllUser = function (where) {
    return prisma_1.default.user.findMany({ where: where });
};
exports.findAllUser = findAllUser;
var findUser = function (where) {
    return prisma_1.default.user.findFirst({ where: where });
};
exports.findUser = findUser;
var updateUserById = function (user_id, data) {
    return prisma_1.default.user.update({ where: { id: user_id }, data: data });
};
exports.updateUserById = updateUserById;
var deleteUserById = function (user_id) {
    return prisma_1.default.user.delete({ where: { id: user_id } });
};
exports.deleteUserById = deleteUserById;
var createUser = function (data) {
    return prisma_1.default.user.create({ data: data });
};
exports.createUser = createUser;
//# sourceMappingURL=user.queries.js.map