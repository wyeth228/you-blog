import { Connection, ResultSetHeader } from "mysql2/promise";

import MySQLRepository from "./MySQLRepository";
import { IUser, IUserSaveData } from "../services/UsersService";

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

  async findWithVKId(vkId: number): Promise<IUser | false> {
    const [rows] = await this._connection.query<ResultSetHeader>(
      "SELECT * FROM users WHERE vk_id = ?",
      [vkId]
    );

    return rows[0] || false;
  }

  async findWithGoogleId(googleId: number): Promise<IUser | false> {
    const [rows] = await this._connection.query<ResultSetHeader>(
      "SELECT * FROM users WHERE google_id = ?",
      [googleId]
    );

    return rows[0] || false;
  }

  async findWithEmail(email: string): Promise<IUser | false> {
    const [rows] = await this._connection.query<ResultSetHeader>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0] || false;
  }
}
