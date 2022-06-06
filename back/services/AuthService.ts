import * as Crypto from "crypto";

import {
  IUserSaveData,
  UsersMySQLRepository,
} from "../repositories/UsersMySQLRepository";
import JWTToken from "../helpers/JWTToken";

import Axios from "axios";

interface IJWTTokens {
  accessToken: string;
  refreshToken: string;
}

interface IVKCredentials {
  accessToken: string;
  userId: number;
}

interface IPasswordEncodeConfig {
  SALT: string;
  ITERATIONS: number;
  KEYLEN: number;
  ALG: string;
}

interface IJWTConfig {
  ISS: string;
  ACCESS_TIME: number;
  REFRESH_TIME: number;
  SECRET: string;
}

interface IVKConfig {
  ACCESS_TOKEN_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export default class AuthService {
  constructor(
    private readonly _usersMySQLRepository: UsersMySQLRepository,
    private readonly _crypto: typeof Crypto,
    private readonly _jwtToken: JWTToken,
    private readonly _axios: typeof Axios,

    private readonly _passwordEncodeConfig: IPasswordEncodeConfig,
    private readonly _jwtConfig: IJWTConfig,
    private readonly _vkConfig: IVKConfig
  ) {}

  async signup(userData: IUserSaveData): Promise<IJWTTokens> {
    userData.password = this._crypto
      .pbkdf2Sync(
        userData.password,
        this._passwordEncodeConfig.SALT,
        this._passwordEncodeConfig.ITERATIONS,
        this._passwordEncodeConfig.KEYLEN,
        this._passwordEncodeConfig.ALG
      )
      .toString("hex");

    const userId: number = await this._usersMySQLRepository.save({
      email: userData.email,
      username: userData.username,
      password: userData.password,
    });

    return {
      accessToken: this._jwtToken.create(
        {
          iss: this._jwtConfig.ISS,
          exp: Date.now() + this._jwtConfig.ACCESS_TIME,
          userId: userId,
        },
        this._jwtConfig.SECRET
      ),
      refreshToken: this._jwtToken.create(
        {
          iss: this._jwtConfig.ISS,
          exp: Date.now() + this._jwtConfig.REFRESH_TIME,
          userId: userId,
        },
        this._jwtConfig.SECRET
      ),
    };
  }

  async authWithVK(
    vkCode: string,
    redirectUriAfterVKAuth: string
  ): Promise<false | IVKCredentials> {
    const { data } = await this._axios.get(
      `${this._vkConfig.ACCESS_TOKEN_URL}?client_id=${this._vkConfig.CLIENT_ID}&client_secret=${this._vkConfig.CLIENT_SECRET}&redirect_uri=${redirectUriAfterVKAuth}&code=${vkCode}`
    );

    const user = await this._usersMySQLRepository.findWithVKId(data.userId);

    if (!user) {
      return false;
    }

    return { accessToken: data.access_token, userId: data.userId };
  }
}
