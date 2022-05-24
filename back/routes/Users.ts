import { Router } from "express";
import UsersController from "../controllers/UsersController";
import UsersService from "../services/UsersService";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";
import StringFilters from "../helpers/StringFilters";
import xss from "xss";

const express = require("express");

const router: Router = new express.Router();

const usersController: UsersController = new UsersController(
  new UsersService(),
  new ValidUserCredentials(),
  new ApiErrorsHandler(),
  new StringFilters(xss)
);

router.post("/users/signin", usersController.signin.bind(usersController));
router.post("/users/signup", usersController.signup.bind(usersController));

export default router;
