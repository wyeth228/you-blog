import * as Crypto from "crypto";
import Axios from "axios";

import {
  IUserSaveData,
  IUser,
  UsersMySQLRepository,
} from "../repositories/UsersMySQLRepository";
import JWTToken from "../helpers/JWTToken";

interface IJWTTokens {
  accessToken: string;
  refreshToken: string;
}

interface IVKAuthCredentials {
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
  CLIENT_SERVICE_SECRET: string;
}

interface IVKUser {
  id: number;
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

  async signUp(userData: IUserSaveData): Promise<IJWTTokens> {
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

  async getVKUserCredentials(
    vkCode: string,
    redirectUriAfterVKAuth: string
  ): Promise<IVKAuthCredentials> {
    const { data } = await this._axios.get(
      `${this._vkConfig.ACCESS_TOKEN_URL}?client_id=${this._vkConfig.CLIENT_ID}&client_secret=${this._vkConfig.CLIENT_SECRET}&redirect_uri=${redirectUriAfterVKAuth}&code=${vkCode}`
    );

    return { accessToken: data.access_token, userId: data.userId };
  }

  async findUserWithVKId(vkId: number): Promise<IUser> {
    return await this._usersMySQLRepository.findWithVKId(vkId);
  }

  async validVKUser(accessToken, vkUserId): Promise<boolean> {
    const { data } = await this._axios.get(
      "https://api.vk.com/method/users.get?v=5.131&access_token=" + accessToken
    );

    if (data.error) {
      return false;
    }

    if (vkUserId !== data.response[0].id) {
      return false;
    }

    return true;
  }
}
