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

  async save(user: IUser): Promise<any> {
    await this._connection.query(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [user.email, user.username, user.password]
    );
  }
}
