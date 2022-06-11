import { Connection } from "mysql2/promise";

import IRepository from "./BaseRepository";

export default abstract class MySQLRepository implements IRepository {
  constructor(protected readonly _connection: Connection) {}

  abstract save(entity: any): any;
}
