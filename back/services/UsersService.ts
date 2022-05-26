import UsersMySQLRepository from "../repositories/UsersMySQLRepository";

interface IUserSignupData {
  email: string;
  username: string;
  password: string;
}

export default class UsersService {
  private readonly _usersMySQLRepository: UsersMySQLRepository;

  constructor(usersMySQLRepository: UsersMySQLRepository) {
    this._usersMySQLRepository = usersMySQLRepository;
  }

  signup(userData: IUserSignupData): void {}
}
