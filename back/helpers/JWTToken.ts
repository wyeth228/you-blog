import * as Crypto from "crypto";

import Base64 from "./Base64";

interface IJWTPayload {
  iss: string;
  exp: number;
  userId: number;
}

interface IDataForPayload {
  userId: number;
}

interface IJWTHeader {
  alg: string;
  typ: "JWT";
}

export interface IJWTConfig {
  ISS: string;
  SECRET: string;
  ACCESS_TIME: number;
  REFRESH_TIME: number;
}

export class JWTToken {
  constructor(
    private readonly _jwtConfig: IJWTConfig,
    private readonly _crypto: typeof Crypto,
    private readonly _base64: Base64
  ) {}

  private createSignature(unsignedToken: string, secret: string): string {
    return this._crypto
      .createHmac("sha256", secret, { encoding: "binary" })
      .update(unsignedToken)
      .digest("base64url");
  }

  private _getHeader(): IJWTHeader {
    return {
      alg: "HS256",
      typ: "JWT",
    };
  }

  private _getPayload(dataForPayload: IDataForPayload): IJWTPayload {
    return {
      iss: this._jwtConfig.ISS,
      exp: Date.now() + this._jwtConfig.ACCESS_TIME,
      userId: dataForPayload.userId,
    };
  }

  valid(token: string, secret: string, iss: string): boolean {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");

    try {
      const header = JSON.parse(this._base64.decodeUrl(encodedHeader));
      const payload = JSON.parse(this._base64.decodeUrl(encodedPayload));

      const unsignedToken: string =
        this._base64.encodeUrl(JSON.stringify(header)) +
        "." +
        this._base64.encodeUrl(JSON.stringify(payload));

      const signature = this.createSignature(unsignedToken, secret);

      if (signature !== encodedSignature) {
        return false;
      }

      if (Date.now() > payload.exp) {
        return false;
      }

      if (iss !== payload.iss) {
        return false;
      }
    } catch (e: any) {
      console.log(e);

      return false;
    }

    return true;
  }

  create(dataForPayload: IDataForPayload, type: "access" | "refresh"): string {
    const stringHeader = JSON.stringify(this._getHeader());
    const stringPayload = JSON.stringify(this._getPayload(dataForPayload));

    const unsignedToken: string =
      this._base64.encodeUrl(stringHeader) +
      "." +
      this._base64.encodeUrl(stringPayload);

    const signature: string = this.createSignature(
      unsignedToken,
      this._jwtConfig.SECRET
    );

    return (
      this._base64.encodeUrl(stringHeader) +
      "." +
      this._base64.encodeUrl(stringPayload) +
      "." +
      signature
    );
  }
}
