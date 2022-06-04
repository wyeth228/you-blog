import UsersMySQLRepository from "../repositories/UsersMySQLRepository";

export default class UsersGoogleService {
  private readonly _usersMySQLRepository: UsersMySQLRepository;

  constructor(usersMySQLRepository: UsersMySQLRepository) {
    this._usersMySQLRepository = usersMySQLRepository;
  }

  signin() {}

  signup() {}
}
