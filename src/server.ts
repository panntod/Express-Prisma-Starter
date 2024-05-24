/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env" });

import fs from "fs";

import bodyParser from "body-parser";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { NotFound } from "./utils/apiResponse";

const app = express();
const PORT = process.env.APP_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.disable("x-powered-by");

app.use(cookieParser());
app.use(express.static("public"));

const rootRoute: string[] = fs.readdirSync("./src/routes");

rootRoute
  .filter((file: string) => {
    return (
      /.(js|ts)$/.test(file) ||
      file.startsWith("_") ||
      fs.lstatSync(__dirname + "/routes/" + file).isDirectory()
    );
  })
  .forEach((file: string) => {
    file = file.replace(/\.[^.]*$/, "");
    try {
      const route = require(__dirname + "/routes/" + file).default;

      //import router handler
      app.use("/" + file, route);

      console.log(
        chalk.blue("[ INFO ] ") + "Route '" + file + "' imported successfully."
      );
    } catch (error) {
      console.log(
        chalk.red("[ ERROR ] ") +
          "Skipped '" +
          file +
          "' module because containing error."
      );
    }
  });

app.use((_, res) => {
  res.status(404).json(NotFound("Error Not Found"));
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`🚀 Server runnning at: http://localhost:${PORT}`)
  );
}

export default app;
