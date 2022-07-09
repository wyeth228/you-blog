import { Request, Response } from "express";

import { AuthorizationService } from "../services/AuthorizationService";
import { ApiResponseHandler } from "../helpers/ApiResponseHandler";
import { GOOGLE_CONFIG, VK_CONFIG } from "../helpers/Configs";

export default class AuthorizeController {
  constructor(
    private readonly _authorizationService: AuthorizationService,
    private readonly _apiResponseHandler: ApiResponseHandler
  ) {}

  async signInWithVK(req: Request, res: Response): Promise<void> {
    const { vk_code, vk_redirect_url } = req.body;

    if (!vk_redirect_url) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(
            400,
            "wrong-vk-redirect-url",
            "ru"
          )
        );

      return;
    }

    if (!vk_code) {
      res
        .status(302)
        .json(
          this._apiResponseHandler.genRedirectData(
            302,
            `https://oauth.vk.com/authorize?client_id=${VK_CONFIG.CLIENT_ID}&redirect_uri=${vk_redirect_url}&display=mobile&scope=offline&response_type=code`
          )
        );

      return;
    }

    try {
      const { vkUserAccessData, user } =
        await this._authorizationService.signInWithVK(vk_code, vk_redirect_url);

      if (!vkUserAccessData) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-vk-code-or-url",
              "ru"
            )
          );

        return;
      }

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

      res.status(204).end();
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async signInWithGoogle(req: Request, res: Response): Promise<void> {
    const { google_code, google_redirect_url } = req.body;

    if (!google_redirect_url) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(
            400,
            "wrong-google-redirect-url",
            "ru"
          )
        );

      return;
    }

    if (!google_code) {
      res
        .status(302)
        .json(
          this._apiResponseHandler.genRedirectData(
            302,
            `https://accounts.google.com/o/oauth2/auth?redirect_uri=${google_redirect_url}&response_type=code&access_type=offline&client_id=${GOOGLE_CONFIG.CLIENT_ID}&scope=profile`
          )
        );

      return;
    }

    try {
      const { googleUserAccessData, googleUserCredentials, user } =
        await this._authorizationService.signInWithGoogle(
          google_code,
          google_redirect_url
        );

      if (!googleUserAccessData) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-google-code-or-url",
              "ru"
            )
          );

        return;
      }

      if (!googleUserCredentials) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-google-access-data",
              "ru"
            )
          );

        return;
      }

      res.cookie("access_token", googleUserAccessData.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
      res.cookie("refresh_token", googleUserAccessData.refreshToken, {
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

      res.cookie("auth_type", "google", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(204).end();
    } catch (e: any) {
      console.log(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async signInSimple(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(
            400,
            "wrong-email-or-password",
            "ru"
          )
        );

      return;
    }

    try {
      const { accessToken, refreshToken, wrongPassword, user } =
        await this._authorizationService.signInSimple(email, password);

      if (!user || wrongPassword) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-email-or-password",
              "ru"
            )
          );

        return;
      }

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

      res.status(204).end();
    } catch (e: any) {
      console.log(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async signUpHandler(req: Request, res: Response): Promise<void> {
    const { email, username, password, type } = req.body;

    const { userCredentialsIsNotValid, userWithEmailAlreadyExists } =
      await this._authorizationService.checkingBeforeSignUp(
        email,
        username,
        password
      );

    if (userCredentialsIsNotValid) {
      res
        .status(400)
        .json(
          this._apiResponseHandler.genErrorData(
            400,
            userCredentialsIsNotValid,
            "ru"
          )
        );

      return;
    }

    if (userWithEmailAlreadyExists) {
      res
        .status(409)
        .json(
          this._apiResponseHandler.genErrorData(
            409,
            "user-already-exists",
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
      const { validVKUser, userWithVKIdAlreadyExists } =
        await this._authorizationService.signUpWithVK(
          email,
          username,
          password,
          access_token,
          user_id
        );

      if (!validVKUser) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-vk-access-data",
              "ru"
            )
          );

        return;
      }

      if (userWithVKIdAlreadyExists) {
        res
          .status(409)
          .json(
            this._apiResponseHandler.genErrorData(
              409,
              "user-already-exists",
              "ru"
            )
          );

        return;
      }

      res.cookie("auth_type", "vk", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(204).end();
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async signUpWithGoogle(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;
    const { access_token } = req.cookies;

    try {
      const { googleUserCredentials, googleUserAlreadyExists } =
        await this._authorizationService.signUpWithGoogle(
          email,
          username,
          password,
          access_token
        );

      if (!googleUserCredentials) {
        res
          .status(400)
          .json(
            this._apiResponseHandler.genErrorData(
              400,
              "wrong-google-access-data",
              "ru"
            )
          );

        return;
      }

      if (googleUserAlreadyExists) {
        res
          .status(409)
          .json(
            this._apiResponseHandler.genErrorData(
              409,
              "user-already-exists",
              "ru"
            )
          );

        return;
      }

      res.cookie("auth_type", "google", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(204).end();
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }

  async signUpSimple(req: Request, res: Response): Promise<void> {
    const { email, username, password } = req.body;

    try {
      const { accessToken, refreshToken } =
        await this._authorizationService.signUpSimple(
          email,
          username,
          password
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

      res.status(204).end();
    } catch (e: any) {
      console.error(e);

      res
        .status(500)
        .json(this._apiResponseHandler.genErrorData(500, "server-error", "ru"));
    }
  }
}
