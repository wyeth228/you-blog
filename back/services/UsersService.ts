import UsersMySQLRepository from "../repositories/UsersMySQLRepository";
import * as Crypto from "crypto";
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

export default class UsersService {
  private readonly _usersMySQLRepository: UsersMySQLRepository;
  private readonly _crypto: typeof Crypto;
  private readonly _jwtToken: JWTToken;

  constructor(
    usersMySQLRepository: UsersMySQLRepository,
    crypto: typeof Crypto,
    jwtToken: JWTToken
  ) {
    this._usersMySQLRepository = usersMySQLRepository;
    this._crypto = crypto;
    this._jwtToken = jwtToken;
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
      .toString();

    const userId = await this._usersMySQLRepository.save({
      email: userData.email,
      username: userData.email,
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
}
