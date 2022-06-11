import { Request, Response } from "express";
import { FilterXSS } from "xss";

import AuthService from "../services/AuthService";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import {
  ApiErrorTypes,
  ApiResponseHandler,
} from "../helpers/ApiResponseHandler";

export default class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _validUserCredentials: ValidUserCredentials,
    private readonly _apiResponseHandler: ApiResponseHandler,
    private readonly _filterXSS: FilterXSS
  ) {}

  async signIn(req: Request, res: Response): Promise<void> {}

  async signUp(req: Request, res: Response): Promise<void> {
    const { type } = req.body;

    switch (type) {
      case "vk":
        this.signUpWithVK(req, res);
        break;
      case "google":
        this.signUpWithGoogle(req, res);
        break;
      default:
        this.signUpSimple(req, res);
        break;
    }
  }

  userCredentialsIsNotValid(
    email: string,
    username: string,
    password: string
  ): { errorType: ApiErrorTypes } | false {
    if (!this._validUserCredentials.email(email)) {
      return { errorType: "email-invalid" };
    }

    if (
      !this._validUserCredentials.username(this._filterXSS.process(username))
    ) {
      return { errorType: "username-invalid" };
    }

    if (!this._validUserCredentials.password(password)) {
      return { errorType: "password-invalid" };
    }

    return false;
  }

  async signUpWithVK(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;
    const { access_token, user_id } = req.cookies;

    const userCredentialsIsNotValid = this.userCredentialsIsNotValid(
      email,
      username,
      password
    );

    if (userCredentialsIsNotValid) {
      res
        .status(400)
        .send(
          this._apiResponseHandler.genErrorData(
            400,
            userCredentialsIsNotValid.errorType,
            "ru"
          )
        );

      return;
    }
  }

  async signUpWithGoogle(req: Request, res: Response): Promise<void> {}

  async signUpSimple(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;

    const userCredentialsIsNotValid = this.userCredentialsIsNotValid(
      email,
      username,
      password
    );

    if (userCredentialsIsNotValid) {
      res
        .status(400)
        .send(
          this._apiResponseHandler.genErrorData(
            400,
            userCredentialsIsNotValid.errorType,
            "ru"
          )
        );

      return;
    }

    try {
      const { accessToken, refreshToken } = await this._authService.signUp({
        email,
        username,
        password,
      });

      res.cookie("auth_type", "simple", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
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
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async authWithVK(req: Request, res: Response): Promise<void> {
    const { vk_code, redirect_url_after_vk_auth } = req.body;

    if (!vk_code) {
      res
        .status(302)
        .json(
          this._apiResponseHandler.genRedirectData(
            302,
            `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&redirect_uri=${redirect_url_after_vk_auth}&display=mobile&scope=offline&response_type=code`
          )
        );

      return;
    }

    try {
      const vkUserCredentials = await this._authService.getVKUserCredentials(
        vk_code,
        redirect_url_after_vk_auth
      );

      const user = await this._authService.findUserWithVKId(
        vkUserCredentials.userId
      );

      res.cookie("access_token", vkUserCredentials.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
      res.cookie("user_id", vkUserCredentials.userId, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      if (!user) {
        res
          .status(404)
          .json(
            this._apiResponseHandler.genErrorData(404, "user-not-found", "ru")
          );

        return;
      }

      res.cookie("auth_type", "vk", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(201).end();
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async authWithGoogle(req: Request, res: Response): Promise<void> {}
}
