import * as Crypto from "crypto";

export interface IPasswordEncodeConfig {
  SALT: string;
  ITERATIONS: number;
  KEYLEN: number;
  ALG: string;
}

export default class PasswordHash {
  constructor(
    private readonly _passwordEncodeConfig: IPasswordEncodeConfig,
    private readonly _crypto: typeof Crypto
  ) {}

  gen(password: string): string {
    return this._crypto
      .pbkdf2Sync(
        password,
        this._passwordEncodeConfig.SALT,
        this._passwordEncodeConfig.ITERATIONS,
        this._passwordEncodeConfig.KEYLEN,
        this._passwordEncodeConfig.ALG
      )
      .toString("hex");
  }
}
