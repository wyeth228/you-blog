import { Buffer } from "buffer";

export default class Base64 {
  private readonly _buffer: typeof Buffer;

  constructor(buffer: typeof Buffer) {
    this._buffer = buffer;
  }

  encodeUrl(str: string): string {
    return this._buffer.from(str).toString("base64url");
  }

  decodeUrl(str: string): string {
    return this._buffer.from(str, "base64url").toString("ascii");
  }
}
