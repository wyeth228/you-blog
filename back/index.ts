import * as express from "express";
import * as mysql2 from "mysql2/promise";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

import getAuthRouter from "./routes/AuthRouter";

require("dotenv").config({ path: ".env." + process.env.NODE_ENV });

async function startApplication() {
  const app: express.Application = express();
  const PORT = process.env.PORT || 1000;

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));
  app.use(cookieParser());
  app.use(cors());

  const mySQLConnection: mysql2.Connection = await mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  });

  app.use("/auth", getAuthRouter(mySQLConnection));

  app.listen(PORT, () => {
    console.log("Server listen on " + PORT + "...");
  });
}

startApplication();
