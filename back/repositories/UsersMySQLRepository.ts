import MySQLRepository from "./MySQLRepository";

import { Connection, ResultSetHeader } from "mysql2/promise";

interface IUser {
  email: string;
  username: string;
  password: string;
}

export default class UsersMySQLRepository extends MySQLRepository {
  constructor(mysqlConnection: Connection) {
    super(mysqlConnection);
  }

  async save(user: IUser): Promise<number> {
    const result = await this._connection.query<ResultSetHeader>(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [user.email, user.username, user.password]
    );

    return result[0].insertId;
  }
}
