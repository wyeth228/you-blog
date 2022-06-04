import { Request, Response } from "express";

import AuthService from "../services/AuthService";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiErrorsHandler from "../helpers/ApiErrorsHandler";
import StringFilters from "../helpers/StringFilters";

export default class AuthController {
  private readonly _usersService: AuthService;
  private readonly _validUserCredentials: ValidUserCredentials;
  private readonly _apiErrorsHandler: ApiErrorsHandler;
  private readonly _stringFilters: StringFilters;

  constructor(
    usersService: AuthService,
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

  async signup(req: Request, res: Response): Promise<void> {
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
      const { accessToken, refreshToken } = await this._usersService.signup({
        email,
        username,
        password,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(201).end();
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiErrorsHandler.genErrorData(500, "server-error", "ru"));
    }
  }
}
