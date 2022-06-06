import { Request, Response } from "express";

import AuthService from "../services/AuthService";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import ApiResponseHandler from "../helpers/ApiResponseHandler";
import StringFilters from "../helpers/StringFilters";

export default class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _validUserCredentials: ValidUserCredentials,
    private readonly _apiResponseHandler: ApiResponseHandler,
    private readonly _stringFilters: StringFilters
  ) {}

  signin(req: Request, res: Response): void {}

  async signup(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;

    if (!this._validUserCredentials.email(email)) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(400, "email-invalid", "ru")
        );

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
          this._apiResponseHandler.genErrorData(400, "username-invalid", "ru")
        );

      return;
    }

    if (!this._validUserCredentials.password(password)) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(400, "password-invalid", "ru")
        );

      return;
    }

    try {
      const { accessToken, refreshToken } = await this._authService.signup({
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

    const vkAuthorize = await this._authService.authWithVK(
      vk_code,
      redirect_url_after_vk_auth
    );

    if (!vkAuthorize) {
      res.status(302).json(this._apiResponseHandler.genRedirectData(302, ""));

      return;
    }

    // const { vkCode, redirectUri } = req.body;
    // if (!vkCode) {
    //   res.status(302).json({
    //     code: 302,
    //     redirect_uri: `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&redirect_uri=${redirectUri}&display=mobile&scope=offline&response_type=code`,
    //   });
    //   return;
    // }
    // try {
    //   const vkAuth = await this._authService.vkAuth(vkCode, redirectUri);
    //   if (vkAuth) {
    //   }
    //   // res.cookie("auth_type", "vk", {
    //   //   httpOnly: true,
    //   //   sameSite: "strict",
    //   //   secure: false,
    //   // });
    //   res.cookie("access_token", vkAuth.accessToken, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     secure: false,
    //   });
    //   res.cookie("user_id", vkAuth.userId, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     secure: false,
    //   });
    //   res.status(302).json({
    //     code: 302,
    //     redirect_uri: redirectUri + "?type=vk",
    //   });
    // } catch (e: any) {
    //   console.error(e);
    //   res
    //     .status(500)
    //     .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    // }
  }

  authWithGoogle(req: Request, res: Response): void {}
}
