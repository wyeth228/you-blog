import IRepository from "./BaseRepository";

import { Connection } from "mysql2/promise";

export default abstract class MySQLRepository implements IRepository {
  protected readonly _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  abstract save(entity: any): any;
}
