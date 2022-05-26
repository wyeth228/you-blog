import BaseRepository from "./Repository";

export default class MySQLRepository extends BaseRepository {
  save<T>(entity: T): void {}
}
