"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.encrypt = void 0;
var bcrypt_1 = require("bcrypt");
var BCRYPT_ROUNDS = 10;
var encrypt = function (plainText) {
    var hashed = (0, bcrypt_1.hashSync)(plainText, BCRYPT_ROUNDS);
    return hashed;
};
exports.encrypt = encrypt;
var compareHash = function (plainText, cipherText) {
    var compare = (0, bcrypt_1.compareSync)(plainText, cipherText);
    return compare;
};
exports.compareHash = compareHash;
//# sourceMappingURL=encryption.js.map