import { Connection, ResultSetHeader } from "mysql2/promise";

import MySQLRepository from "./MySQLRepository";

export interface IUserSaveData {
  email: string;
  username: string;
  password: string;
  vkId: number;
  googleId: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  vk_id: number;
  google_id: string;
}

export class UsersMySQLRepository extends MySQLRepository {
  constructor(mysqlConnection: Connection) {
    super(mysqlConnection);
  }

  async save(user: IUserSaveData): Promise<IUser> {
    const result = await this._connection.query<ResultSetHeader>(
      "INSERT INTO users (email, username, password, vk_id, google_id) VALUES (?, ?, ?, ?, ?)",
      [user.email, user.username, user.password, user.vkId, user.googleId]
    );

    return {
      id: result[0].insertId,
      email: user.email,
      username: user.username,
      password: user.password,
      vk_id: user.vkId,
      google_id: user.googleId,
    };
  }

  async findWithVKId(vkId: number): Promise<IUser> {
    const [rows] = await this._connection.query<ResultSetHeader>(
      "SELECT * FROM users WHERE vk_id = ?",
      [vkId]
    );

    return rows[0];
  }
}
