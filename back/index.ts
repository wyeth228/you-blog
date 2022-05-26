import { Application } from "express";
import { Connection } from "mysql2/promise";
import usersRouter from "./routes/Users";

require("dotenv").config({ path: ".env." + process.env.NODE_ENV });
const express = require("express");
const mysql = require("mysql2/promise");
const isDevelopment = process.env.NODE_ENV === "development";

async function startApplication() {
  const app: Application = express();
  const PORT = process.env.PORT || 1000;

  const mysqlConnection: Connection = await mysql.createConnection({
    host: "localhost",
  });

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ limit: "10kb" }));

  app.use("/", usersRouter);

  app.listen(PORT, () => {
    console.log("Server listen on " + PORT + "...");
  });
}

startApplication();
