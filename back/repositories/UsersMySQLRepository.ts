import { Connection } from "mysql2/promise";
import MySQLRepository from "./MySQLRepository";

interface IUser {
  email: string;
  username: string;
  password: string;
}

export default class UsersMySQLRepository extends MySQLRepository {
  constructor(mysqlConnection: Connection) {
    super(mysqlConnection);
  }

  save(user: IUser): void {}
}
