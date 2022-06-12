import { Request, Response } from "express";

import { AuthService } from "../services/AuthService";
import { ApiResponseHandler } from "../helpers/ApiResponseHandler";

export default class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _apiResponseHandler: ApiResponseHandler
  ) {}

  async signInHandler(req: Request, res: Response): Promise<void> {}

  async signUpHandler(req: Request, res: Response): Promise<void> {
    const { email, username, password, type } = req.body;

    const userCredentialsIsNotValid =
      this._authService.userCredentialsIsNotValid(email, username, password);

    if (userCredentialsIsNotValid) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(
            400,
            userCredentialsIsNotValid.errorType,
            "ru"
          )
        );

      return;
    }

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

  async signUpWithVK(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;
    const { access_token, user_id } = req.cookies;

    try {
      if (!this._authService.validVKUser(access_token, user_id)) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-credentials",
              "ru"
            )
          );

        return;
      }

      await this._authService.saveUser({
        email,
        username,
        password,
        vkId: 0,
        googleId: "",
      });

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

  async signUpWithGoogle(req: Request, res: Response): Promise<void> {}

  async signUpSimple(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;

    try {
      const newUser = await this._authService.saveUser({
        email,
        username,
        password,
        vkId: 0,
        googleId: "",
      });

      const { accessToken, refreshToken } = this._authService.genJWTTokens(
        newUser.id
      );

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
    const { vk_code, vk_redirect_url } = req.body;

    if (!vk_redirect_url) {
      res
        .status(400)
        .send(
          this._apiResponseHandler.genErrorData(400, "wrong-credentials", "ru")
        );

      return;
    }

    if (!vk_code) {
      res
        .status(302)
        .json(
          this._apiResponseHandler.genRedirectData(
            302,
            `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&redirect_uri=${vk_redirect_url}&display=mobile&scope=offline&response_type=code`
          )
        );

      return;
    }

    try {
      const vkUserAccessData = await this._authService.getVKUserAccessData(
        vk_code,
        vk_redirect_url
      );

      const user = await this._authService.findUserWithVKId(
        vkUserAccessData.userId
      );

      res.cookie("access_token", vkUserAccessData.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
      res.cookie("user_id", vkUserAccessData.userId, {
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
