import UsersMySQLRepository from "../repositories/UsersMySQLRepository";
import * as Crypto from "crypto";

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

  constructor(
    usersMySQLRepository: UsersMySQLRepository,
    crypto: typeof Crypto
  ) {
    this._usersMySQLRepository = usersMySQLRepository;
    this._crypto = crypto;
  }

  signup(userData: IUserSignupData): ITokens {
    userData.password = this._crypto
      .pbkdf2Sync(
        userData.password,
        process.env.PASSWORD_SALT,
        Number(process.env.PASSWORD_ITERATIONS),
        Number(process.env.PASSWORD_KEYLEN),
        process.env.PASSWORD_ALG
      )
      .toString();

    this._usersMySQLRepository.save({
      email: userData.email,
      username: userData.email,
      password: userData.password,
    });

    return { accessToken: "", refreshToken: "" };
  }
}
