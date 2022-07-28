import * as express from "express";
import * as mysql2 from "mysql2/promise";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

import getAuthorizationRouter from "./routes/AuthorizationRouter";

import { APP_CONFIG, MYSQL_CONFIG } from "./helpers/Configs";

async function bootstrap() {
  const app: express.Application = express();
  const PORT = APP_CONFIG.PORT || 4000;

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        callback(null, true);

        // if (origin && APP_CONFIG.ORIGINS.includes(origin)) {
        //   return callback(null, true);
        // }

        // callback(new Error("Not allowed by CORS"));
      },
    })
  );

  const mySQLConnection: mysql2.Connection = await mysql2.createConnection({
    host: MYSQL_CONFIG.HOST,
    user: MYSQL_CONFIG.USER,
    database: MYSQL_CONFIG.DATABASE,
    password: MYSQL_CONFIG.PASSWORD,
  });

  app.use("/authorization", getAuthorizationRouter(mySQLConnection));

  app.listen(PORT, () => {
    console.log("Server listen on " + PORT + "...");
  });
}

bootstrap();
