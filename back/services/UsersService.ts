import { UsersMySQLRepository } from "../repositories/UsersMySQLRepository";
import PasswordHash from "../helpers/PasswordHash";
import { ApiErrorTypes } from "../helpers/ApiResponseHandler";
import ValidUserCredentials from "../helpers/ValidUserCredentials";

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  vk_id: number;
  google_id: number;
}

export interface IUserSaveData {
  email: string;
  username: string;
  password: string;
  vkId: number;
  googleId: number;
}

export class UsersService {
  constructor(
    private readonly _usersMySQLRepository: UsersMySQLRepository,
    private readonly _passwordHash: PasswordHash,
    private readonly _validUserCredentials: ValidUserCredentials
  ) {}

  async save(userData: IUserSaveData): Promise<IUser> {
    return await this._usersMySQLRepository.save({
      email: userData.email,
      username: userData.username,
      password: this._passwordHash.gen(userData.password),
      vkId: userData.vkId,
      googleId: userData.googleId,
    });
  }

  async findUserWithVKId(vkId: number): Promise<IUser | false> {
    return await this._usersMySQLRepository.findWithVKId(vkId);
  }

  async findUserWithGoogleId(googleId: number): Promise<IUser | false> {
    return await this._usersMySQLRepository.findWithGoogleId(googleId);
  }

  async findUserWithEmail(email: string): Promise<IUser | false> {
    return await this._usersMySQLRepository.findWithEmail(email);
  }

  credentialsIsNotValid(
    email: string,
    username: string,
    password: string
  ): { errorType: ApiErrorTypes } | false {
    if (!this._validUserCredentials.email(email)) {
      return { errorType: "email-invalid" };
    }

    if (!this._validUserCredentials.username(username)) {
      return { errorType: "username-invalid" };
    }

    if (!this._validUserCredentials.password(password)) {
      return { errorType: "password-invalid" };
    }

    return false;
  }
}
