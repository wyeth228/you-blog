import * as HTTPS from "https";
import * as Crypto from "crypto";

import UsersMySQLRepository from "../repositories/UsersMySQLRepository";
import JWTToken from "../helpers/JWTToken";

interface IUserSignupData {
  email: string;
  username: string;
  password: string;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export default class AuthService {
  private readonly _usersMySQLRepository: UsersMySQLRepository;
  private readonly _crypto: typeof Crypto;
  private readonly _jwtToken: JWTToken;
  private readonly _https: typeof HTTPS;

  constructor(
    usersMySQLRepository: UsersMySQLRepository,
    crypto: typeof Crypto,
    jwtToken: JWTToken,
    https: typeof HTTPS
  ) {
    this._usersMySQLRepository = usersMySQLRepository;
    this._crypto = crypto;
    this._jwtToken = jwtToken;
    this._https = https;
  }

  async signup(userData: IUserSignupData): Promise<ITokens> {
    userData.password = this._crypto
      .pbkdf2Sync(
        userData.password,
        process.env.PASSWORD_SALT,
        Number(process.env.PASSWORD_ITERATIONS),
        Number(process.env.PASSWORD_KEYLEN),
        process.env.PASSWORD_ALG
      )
      .toString("hex");

    const userId = await this._usersMySQLRepository.save({
      email: userData.email,
      username: userData.username,
      password: userData.password,
    });

    return {
      accessToken: this._jwtToken.create(
        {
          iss: process.env.JWT_ISS,
          exp: Date.now() + Number(process.env.JWT_ACCESS_TIME),
          userId: userId,
        },
        process.env.JWT_SECRET
      ),
      refreshToken: this._jwtToken.create(
        {
          iss: process.env.JWT_ISS,
          exp: Date.now() + Number(process.env.JWT_REFRESH_TIME),
          userId: userId,
        },
        process.env.JWT_SECRET
      ),
    };
  }

  async vkAuth(vkCode: string, redirectUri: string): Promise<void> {
    console.log(
      await this._https.get(
        `${process.env.VK_ACCESS_TOKEN_URL}?client_id=${process.env.VK_CLIENT_ID}&client_secret=${process.env.VK_CLIENT_SECRET}&redirect_uri=${redirectUri}&code=${vkCode}`
      )
    );
  }
}
