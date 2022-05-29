import * as Crypto from "crypto";
import Base64 from "./Base64";

interface IJWTPayload {
  iss: string;
  exp: number;
  userId: number;
}

export default class JWTToken {
  private readonly _crypto: typeof Crypto;
  private readonly _base64: Base64;

  constructor(crypto: typeof Crypto, base64: Base64) {
    this._crypto = crypto;
    this._base64 = base64;
  }

  create(payload: IJWTPayload, secret): string {
    const header = JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    });

    const stringPayload = JSON.stringify(payload);

    const unsignedToken: string =
      this._base64.encodeUrl(header) +
      "." +
      this._base64.encodeUrl(stringPayload);

    const signature: string = this._crypto
      .createHmac("sha256", secret, { encoding: "binary" })
      .update(unsignedToken)
      .digest("base64url");

    return (
      this._base64.encodeUrl(header) +
      "." +
      this._base64.encodeUrl(stringPayload) +
      "." +
      signature
    );
  }
}
