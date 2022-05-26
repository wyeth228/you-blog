interface IRepository {
  save: (entity: any) => any;
}

export default abstract class BaseRepository implements IRepository {
  abstract save<T>(entity: T): any;
}
