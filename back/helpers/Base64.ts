import { Buffer } from "buffer";

export default class Base64 {
  constructor(private readonly _buffer: typeof Buffer) {}

  encodeUrl(str: string): string {
    return this._buffer.from(str).toString("base64url");
  }

  decodeUrl(str: string): string {
    return this._buffer.from(str, "base64url").toString("ascii");
  }
}
