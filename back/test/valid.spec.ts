import { describe, test, expect } from "@jest/globals";
import Valid from "../helpers/Valid";

describe("Testing the Valid class methods", () => {
  const valid = new Valid();

  test("Testing the email method", () => {
    expect(valid.email(31231)).toBe(false);
    expect(valid.email("da")).toBe(false);
    expect(valid.email("has@gmail.com")).toBe(true);
    expect(valid.email("hasmail.ru")).toBe(false);
    expect(valid.email("mail@mail.")).toBe(false);
  });
});
