import { Application } from "express";
import { Connection } from "mysql2/promise";
import getAuthRouter from "./routes/AuthRouter";
import * as mysql2 from "mysql2/promise";

require("dotenv").config({ path: ".env." + process.env.NODE_ENV });
const express = require("express");

async function startApplication() {
  const app: Application = express();
  const PORT = process.env.PORT || 1000;

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  const mySQLConnection: Connection = await mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

  app.use("/", getAuthRouter(mySQLConnection));

  app.listen(PORT, () => {
    console.log("Server listen on " + PORT + "...");
  });
}

startApplication();
