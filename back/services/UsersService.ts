interface IUserSignupData {
  email: string;
  username: string;
  password: string;
}

export default class UsersService {
  signup(userData: IUserSignupData): void {
    console.log(userData);
  }
}
