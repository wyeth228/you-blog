import MySQLRepository from "./MySQLRepository";

interface IUser {
  email: string;
  username: string;
  password: string;
}

export default class UsersMySQLRepository extends MySQLRepository {
  constructor(mysqlConnection: {}) {
    super(mysqlConnection);
  }

  save(user: IUser): void {}
}
