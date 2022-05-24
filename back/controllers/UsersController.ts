import { Request, Response } from "express";

import UsersService from "../services/UsersService";
import Valid from "../helpers/Valid";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";

export default class UsersController {
  private readonly _usersService: UsersService;
  private readonly _valid: Valid;
  private readonly _apiErrorsHandler: ApiErrorsHandler;

  constructor(
    usersService: UsersService,
    valid: Valid,
    apiErrorsHandler: ApiErrorsHandler
  ) {
    this._usersService = usersService;
    this._valid = valid;
    this._apiErrorsHandler = apiErrorsHandler;
  }

  signin(req: Request, res: Response): void {}

  signup(req: Request, res: Response): void {
    try {
      const { email, username, password } = req.body;

      if (!this._valid.email(email)) {
        const status = 400;

        res
          .status(status)
          .send(
            this._apiErrorsHandler.genErrorData(status, "email-invalid", "ru")
          );

        return;
      }

      if (!this._valid.username(username)) {
        const status = 400;

        res
          .status(status)
          .send(
            this._apiErrorsHandler.genErrorData(
              status,
              "username-invalid",
              "ru"
            )
          );

        return;
      }

      if (!this._valid.password(password)) {
      }

      this._usersService.signup({ email, username, password });
    } catch (e: any) {
      console.error("Catched signup error");

      // Handle error
    }
  }
}
