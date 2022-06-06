import MySQLRepository from "./MySQLRepository";

import { Connection, ResultSetHeader } from "mysql2/promise";

export interface IUserSaveData {
  email: string;
  username: string;
  password: string;
}

interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  vk_id: string;
  google_id: string;
}

export class UsersMySQLRepository extends MySQLRepository {
  constructor(mysqlConnection: Connection) {
    super(mysqlConnection);
  }

  async save(user: IUserSaveData): Promise<number> {
    const result = await this._connection.query<ResultSetHeader>(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [user.email, user.username, user.password]
    );

    return result[0].insertId;
  }

  async findWithVKId(vkId: number): Promise<IUser> {
    const [rows] = await this._connection.query<ResultSetHeader>(
      "SELECT * FROM users WHERE vk_id = ?",
      ["1"]
    );

    return rows[0];
  }
}
