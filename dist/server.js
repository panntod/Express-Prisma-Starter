"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env" });
var fs_1 = __importDefault(require("fs"));
var body_parser_1 = __importDefault(require("body-parser"));
var chalk_1 = __importDefault(require("chalk"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var apiResponse_1 = require("./utils/apiResponse");
var app = (0, express_1.default)();
var PORT = process.env.APP_PORT;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.disable("x-powered-by");
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
var rootRoute = fs_1.default.readdirSync("./src/routes");
rootRoute
    .filter(function (file) {
    return (/.(js|ts)$/.test(file) ||
        file.startsWith("_") ||
        fs_1.default.lstatSync(__dirname + "/routes/" + file).isDirectory());
})
    .forEach(function (file) {
    file = file.replace(/\.[^.]*$/, "");
    try {
        var route = require(__dirname + "/routes/" + file).default;
        //import router handler
        app.use("/" + file, route);
        console.log("[".concat(chalk_1.default.blue("INFO"), "] Route '").concat(file, "' imported successfully."));
    }
    catch (error) {
        console.log("[".concat(chalk_1.default.red("ERROR"), "] Skipped '").concat(file, "' module because containing error."));
    }
});
app.use(function (_, res) {
    res.status(404).json((0, apiResponse_1.NotFound)("Error Not Found"));
});
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, function () {
        return console.log("\uD83D\uDE80 Server runnning at: http://localhost:".concat(PORT));
    });
}
exports.default = app;
//# sourceMappingURL=server.js.map