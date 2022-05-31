import { describe, test, expect } from "@jest/globals";

import * as Crypto from "crypto";
import Base64 from "../helpers/Base64";
import { Buffer } from "buffer";
import JWTToken from "../helpers/JWTToken";

describe("Testing JWTToken class", () => {
  const jwtToken = new JWTToken(Crypto, new Base64(Buffer));

  test("Creating jwt token", () => {
    expect(
      jwtToken.create(
        {
          iss: "youblog",
          exp: 100,
          userId: 1,
        },
        "secretkey"
      )
    ).toBe(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VibG9nIiwiZXhwIjoxMDAsInVzZXJJZCI6MX0.sASYRdk4IbNI8teXHJ1GZMXQWg6V67tVNiFtPo-BY10"
    );
  });

  test("Verify jwt token", () => {
    expect(
      jwtToken.valid(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VibG9nIiwiZXhwIjoxNjU0MDc0NjI4NTQ4LCJ1c2VySWQiOjF9.PhcxcU0clXuydomU1lEhc9zv8bGsLFhvevPn-ZC89JM",
        "secretkey",
        "youblog"
      )
    ).toBe(true);
    expect(
      jwtToken.valid(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VibG9nIiwiZXhwIjoxNjU0MDc0NjI4NTQ4LCJ1c2VySWQiOjF9.PhcxcU0clXuydomU1lEhc9zv8bGsLFhvevPn-ZC89JM",
        "WRONG SECRET KEY",
        "youblog"
      )
    ).toBe(false);
    expect(
      jwtToken.valid(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VibG9nIiwiZXhwIjoxNjU0MDc0NjI4NTQ4LCJ1c2VySWQiOjF9.PhcxcU0clXuydomU1lEhc9zv8bGsLFhvevPn-ZC89JM",
        "secretkey",
        "WRONG ISSUER OF an JWT"
      )
    ).toBe(false);
    expect(
      jwtToken.valid(
        "REPLACEDTHEHEADER.REPLACEDTHEPAYLOAD.ANDTHEWRONGSINATURE",
        "secretkey",
        "youblog"
      )
    ).toBe(false);
  });
});
