import { Router } from "express";
import UsersController from "../controllers/UsersController";
import UsersService from "../services/UsersService";

const express = require("express");

const router: Router = new express.Router();

const usersController: UsersController = new UsersController(
  new UsersService()
);

router.post("/signin", usersController.signin);
router.post("/signup", usersController.signup);

export default router;
