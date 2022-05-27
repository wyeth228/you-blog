import { Router } from "express";
import { Connection } from "mysql2/promise";
import * as Crypto from "crypto";
import UsersController from "../controllers/UsersController";
import UsersService from "../services/UsersService";
import UsersMySQLRepository from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";
import StringFilters from "../helpers/StringFilters";

const express = require("express");
const xss = require("xss");

const getUsersRouter = (mySQLConnection: Connection): Router => {
  const router: Router = new express.Router();

  const usersController: UsersController = new UsersController(
    new UsersService(new UsersMySQLRepository(mySQLConnection), Crypto),
    new ValidUserCredentials(),
    new ApiErrorsHandler(),
    new StringFilters(xss)
  );

  router.post("/users/signin", usersController.signin.bind(usersController));
  router.post("/users/signup", usersController.signup.bind(usersController));

  return router;
};

export default getUsersRouter;
