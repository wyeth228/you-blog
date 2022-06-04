import UsersMySQLRepository from "../repositories/UsersMySQLRepository";

export default class UsersVKService {
  private readonly _usersMySQLRepository: UsersMySQLRepository;

  constructor(usersMySQLRepository: UsersMySQLRepository) {
    this._usersMySQLRepository = usersMySQLRepository;
  }

  signin() {}

  signup() {}
}
