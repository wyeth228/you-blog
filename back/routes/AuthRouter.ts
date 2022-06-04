import { Router } from "express";
import { Connection } from "mysql2/promise";
import * as Crypto from "crypto";
import AuthConrtoller from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import UsersMySQLRepository from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";
import StringFilters from "../helpers/StringFilters";
import JWTToken from "../helpers/JWTToken";
import Base64 from "../helpers/Base64";
import { Buffer } from "buffer";

const express = require("express");
const xss = require("xss");

const getAuthRouter = (mySQLConnection: Connection): Router => {
  const router: Router = new express.Router();
  const jwtToken: JWTToken = new JWTToken(Crypto, new Base64(Buffer));

  const authController: AuthConrtoller = new AuthConrtoller(
    new AuthService(
      new UsersMySQLRepository(mySQLConnection),
      Crypto,
      jwtToken
    ),
    new ValidUserCredentials(),
    new ApiErrorsHandler(),
    new StringFilters(xss)
  );

  router.post("/signin", authController.signin.bind(authController));
  router.post("/signup", authController.signup.bind(authController));

  return router;
};

export default getAuthRouter;
