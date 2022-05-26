interface IUserSignupData {
  email: string;
  username: string;
  password: string;
}

export default class UsersService {
  constructor() {}

  signup(userData: IUserSignupData): void {}
}
