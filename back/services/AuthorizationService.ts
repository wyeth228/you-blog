import { UsersService, IUser } from "./UsersService";
import { JWTToken } from "../helpers/JWTToken";
import { VKOAuth, IVKUserAccessData } from "../helpers/VKOAuth";
import {
  GoogleOAuth,
  IGoogleUserAccessData,
  IGoogleUserCredentials,
} from "../helpers/GoogleOAuth";
import PasswordHash from "../helpers/PasswordHash";
import { ApiErrorTypes } from "../helpers/ApiResponseHandler";

interface SimpleSignInResult {
  accessToken: string | false;
  refreshToken: string | false;
  wrongPassword: boolean;
  user: IUser | false;
}

export class AuthorizationService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtToken: JWTToken,
    private readonly _vkOAuth: VKOAuth,
    private readonly _googleOAuth: GoogleOAuth,
    private readonly _passwordHash: PasswordHash
  ) {}

  async signInWithVK(
    vkCode: string,
    vkRedirectUrl
  ): Promise<{
    vkUserAccessData: IVKUserAccessData | false;
    user: IUser | false;
  }> {
    const vkUserAccessData = await this._vkOAuth.getUserAccessData(
      vkCode,
      vkRedirectUrl
    );

    if (!vkUserAccessData) {
      return {
        vkUserAccessData,
        user: false,
      };
    }

    const user = await this._usersService.findUserWithVKId(
      vkUserAccessData.userId
    );

    return {
      vkUserAccessData,
      user,
    };
  }

  async signInWithGoogle(
    googleCode: string,
    googleRedirectUrl: string
  ): Promise<{
    googleUserAccessData: IGoogleUserAccessData | false;
    googleUserCredentials: IGoogleUserCredentials | false;
    user: IUser | false;
  }> {
    const googleUserAccessData = await this._googleOAuth.getUserAccessData(
      googleCode,
      googleRedirectUrl
    );

    if (!googleUserAccessData) {
      return {
        googleUserAccessData,
        googleUserCredentials: false,
        user: false,
      };
    }

    const googleUserCredentials = await this._googleOAuth.getUserCredentials(
      googleUserAccessData.accessToken
    );

    if (!googleUserCredentials) {
      return {
        googleUserAccessData,
        googleUserCredentials,
        user: false,
      };
    }

    const user = await this._usersService.findUserWithGoogleId(
      googleUserCredentials.userId
    );

    return {
      googleUserAccessData,
      googleUserCredentials,
      user,
    };
  }

  async signInSimple(
    email: string,
    password: string
  ): Promise<SimpleSignInResult> {
    const result = {
      accessToken: false,
      refreshToken: false,
      wrongPassword: false,
      user: false,
    } as SimpleSignInResult;

    const user = await this._usersService.findUserWithEmail(email);

    if (!user) {
      return result;
    }

    result.user = user;

    if (this._passwordHash.gen(password) !== user.password) {
      result.wrongPassword = true;

      return result;
    }

    result.accessToken = this._jwtToken.create(
      {
        userId: user.id,
      },
      "access"
    );

    result.refreshToken = this._jwtToken.create(
      {
        userId: user.id,
      },
      "refresh"
    );

    return result;
  }

  async checkingBeforeSignUp(
    email,
    username,
    password
  ): Promise<{
    userCredentialsIsNotValid: ApiErrorTypes | false;
    userWithEmailAlreadyExists: boolean;
  }> {
    const result = {
      userCredentialsIsNotValid: false as ApiErrorTypes | false,
      userWithEmailAlreadyExists: false,
    };

    const credentialsIsNotValid = this._usersService.credentialsIsNotValid(
      email,
      username,
      password
    );

    if (credentialsIsNotValid) {
      result.userCredentialsIsNotValid = credentialsIsNotValid.errorType;

      return result;
    }

    const user = await this._usersService.findUserWithEmail(email);

    if (user) {
      result.userWithEmailAlreadyExists = true;
    }

    return result;
  }

  async signUpWithVK(
    email: string,
    username: string,
    password: string,
    vkAccessToken: string,
    vkUserId: number
  ): Promise<{
    validVKUser: boolean;
    userWithVKIdAlreadyExists: boolean;
  }> {
    const result = {
      validVKUser: false,
      userWithVKIdAlreadyExists: false,
    };

    if (await this._vkOAuth.validVKUser(vkAccessToken, vkUserId)) {
      result.validVKUser = true;
    }

    if (await this._usersService.findUserWithVKId(vkUserId)) {
      result.userWithVKIdAlreadyExists = true;

      return result;
    }

    await this._usersService.save({
      email,
      username,
      password,
      vkId: 0,
      googleId: 0,
    });

    return result;
  }

  async signUpWithGoogle(
    email: string,
    username: string,
    password: string,
    accessToken: string
  ): Promise<{
    googleUserCredentials: IGoogleUserCredentials | false;
    googleUserAlreadyExists: boolean;
  }> {
    const result = {
      googleUserCredentials: false as false,
      googleUserAlreadyExists: false,
    };

    const googleUserCredentials = await this._googleOAuth.getUserCredentials(
      accessToken
    );

    if (!googleUserCredentials) {
      return result;
    }

    if (
      await this._usersService.findUserWithGoogleId(
        googleUserCredentials.userId
      )
    ) {
      result.googleUserAlreadyExists = true;

      return result;
    }

    await this._usersService.save({
      email,
      username,
      password,
      vkId: 0,
      googleId: googleUserCredentials.userId,
    });

    return result;
  }

  async signUpSimple(
    email: string,
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this._usersService.save({
      email,
      username,
      password,
      vkId: 0,
      googleId: 0,
    });

    return {
      accessToken: this._jwtToken.create({ userId: user.id }, "access"),
      refreshToken: this._jwtToken.create({ userId: user.id }, "refresh"),
    };
  }
}
