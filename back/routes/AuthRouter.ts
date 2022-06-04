import { Buffer } from "buffer";
import * as express from "express";
import * as HTTPS from "https";
import * as Crypto from "crypto";

import AuthConrtoller from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import UsersMySQLRepository from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";
import StringFilters from "../helpers/StringFilters";
import JWTToken from "../helpers/JWTToken";
import Base64 from "../helpers/Base64";

import xss from "xss";
import { Connection } from "mysql2/promise";

const getAuthRouter = (mySQLConnection: Connection): express.Router => {
  const router: express.Router = express.Router();
  const jwtToken: JWTToken = new JWTToken(Crypto, new Base64(Buffer));

  const authController: AuthConrtoller = new AuthConrtoller(
    new AuthService(
      new UsersMySQLRepository(mySQLConnection),
      Crypto,
      jwtToken,
      HTTPS
    ),
    new ValidUserCredentials(),
    new ApiErrorsHandler(),
    new StringFilters(xss)
  );

  router.post("/signin", authController.signin.bind(authController));
  router.post("/signup", authController.signup.bind(authController));
  router.post("/vk", authController.vkAuth.bind(authController));
  router.post("/google", authController.googleAuth.bind(authController));

  return router;
};

export default getAuthRouter;
