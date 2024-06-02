"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
var prisma;
if (process.env.NODE_ENV !== "production") {
    prisma = new client_1.PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new client_1.PrismaClient();
    }
    prisma = global.prisma;
}
exports.default = prisma;
//# sourceMappingURL=prisma.js.map