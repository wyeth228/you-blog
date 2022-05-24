import { Router } from "express";
import UsersController from "../controllers/UsersController";
import UsersService from "../services/UsersService";
import Valid from "../helpers/Valid";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";

const express = require("express");

const router: Router = new express.Router();

const usersController: UsersController = new UsersController(
  new UsersService(),
  new Valid(),
  new ApiErrorsHandler()
);

router.post("/signin", usersController.signin);
router.post("/signup", usersController.signup);

export default router;
