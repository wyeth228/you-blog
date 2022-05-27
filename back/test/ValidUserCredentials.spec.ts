import { describe, test, expect } from "@jest/globals";
import ValidUserCredentials from "../helpers/validUserCredentials";

describe("Testing the validUserCredentials class methods", () => {
  const validUserCredentials = new ValidUserCredentials();

  test("Testing the email method", () => {
    expect(validUserCredentials.email({})).toBe(false);
    expect(validUserCredentials.email([])).toBe(false);
    expect(validUserCredentials.email(31231)).toBe(false);
    expect(validUserCredentials.email("da")).toBe(false);
    expect(validUserCredentials.email("has@gmail.com")).toBe(true);
    expect(validUserCredentials.email("hasmail.ru")).toBe(false);
    expect(validUserCredentials.email("mail@mail.")).toBe(false);
    expect(validUserCredentials.email("<script>alert(/1/);</script>")).toBe(
      false
    );
  });

  test("Testing the username method", () => {
    expect(validUserCredentials.username({})).toBe(false);
    expect(validUserCredentials.username("user-1_2аяая")).toBe(true);
    expect(validUserCredentials.username("user-1_2аяая!=+131")).toBe(false);
    expect(validUserCredentials.username("лала9505")).toBe(true);
    expect(validUserCredentials.username("-_-__-")).toBe(true);
    expect(validUserCredentials.username("1")).toBe(false);
    expect(validUserCredentials.username("444")).toBe(true);
    expect(validUserCredentials.username("<html><h1>Hello!</h1></html>")).toBe(
      false
    );
    expect(
      validUserCredentials.username("<script>alert(/Hello!/);</script>")
    ).toBe(false);
    expect(validUserCredentials.username("Hasm")).toBe(true);
  });

  test("Testing the password method", () => {
    expect(validUserCredentials.password([])).toBe(false);
    expect(validUserCredentials.password("7312312371")).toBe(true);
    expect(validUserCredentials.password("31231")).toBe(false);
    expect(validUserCredentials.password(3123123)).toBe(false);
    expect(validUserCredentials.password("daiwda381237123-0041491")).toBe(true);
    expect(
      validUserCredentials.password(
        "wehfyebhofwaihfan31312sdlks01-02-312031-31cias"
      )
    ).toBe(false);
  });
});
