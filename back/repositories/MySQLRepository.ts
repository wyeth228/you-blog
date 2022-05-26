import IRepository from "./BaseRepository";

export default abstract class MySQLRepository implements IRepository {
  protected readonly _connection: {};

  constructor(connection: {}) {
    this._connection = connection;
  }

  abstract save(entity: any): any;
}
