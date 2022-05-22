import { Request, Response } from "express";

import UsersService from "../services/UsersService";

export default class UsersController {
  private readonly _usersService: UsersService;

  constructor(usersService: UsersService) {
    this._usersService = usersService;
  }

  signin(req: Request, res: Response): void {}

  signup(req: Request, res: Response): void {
    try {
      const { email, username, password } = req.body;

      // Validation data

      this._usersService.signup({ email, username, password });
    } catch (e: any) {
      console.error("Catched signup error");

      // Handle error
    }
  }
}
