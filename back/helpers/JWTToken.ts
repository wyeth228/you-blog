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

  private createSignature(unsignedToken: string, secret: string): string {
    return this._crypto
      .createHmac("sha256", secret, { encoding: "binary" })
      .update(unsignedToken)
      .digest("base64url");
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
      return false;
    }

    return true;
  }

  create(payload: IJWTPayload, secret: string): string {
    const header = JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    });

    const stringPayload = JSON.stringify(payload);

    const unsignedToken: string =
      this._base64.encodeUrl(header) +
      "." +
      this._base64.encodeUrl(stringPayload);

    const signature: string = this.createSignature(unsignedToken, secret);

    return (
      this._base64.encodeUrl(header) +
      "." +
      this._base64.encodeUrl(stringPayload) +
      "." +
      signature
    );
  }
}
