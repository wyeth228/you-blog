import { Request, Response } from "express";

import UsersService from "../services/UsersService";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";
import StringFilters from "../helpers/StringFilters";

export default class UsersController {
  private readonly _usersService: UsersService;
  private readonly _validUserCredentials: ValidUserCredentials;
  private readonly _apiErrorsHandler: ApiErrorsHandler;
  private readonly _stringFilters: StringFilters;

  constructor(
    usersService: UsersService,
    validUserCredentials: ValidUserCredentials,
    apiErrorsHandler: ApiErrorsHandler,
    stringFilters: StringFilters
  ) {
    this._usersService = usersService;
    this._validUserCredentials = validUserCredentials;
    this._apiErrorsHandler = apiErrorsHandler;
    this._stringFilters = stringFilters;
  }

  signin(req: Request, res: Response): void {}

  signup(req: Request, res: Response): void {
    const { email, username, password } = req.body;

    if (!this._validUserCredentials.email(email)) {
      res
        .status(400)
        .json(this._apiErrorsHandler.genErrorData(400, "email-invalid", "ru"));

      return;
    }

    if (
      !this._validUserCredentials.username(
        this._stringFilters.xssFiltrate(username)
      )
    ) {
      res
        .status(400)
        .json(
          this._apiErrorsHandler.genErrorData(400, "username-invalid", "ru")
        );

      return;
    }

    if (!this._validUserCredentials.password(password)) {
      res
        .status(400)
        .json(
          this._apiErrorsHandler.genErrorData(400, "password-invalid", "ru")
        );

      return;
    }

    try {
      const { accessToken, refreshToken } = this._usersService.signup({
        email,
        username,
        password,
      });

      res.status(201).json({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiErrorsHandler.genErrorData(500, "server-error", "ru"));
    }
  }
}
