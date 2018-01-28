import Base from './base'
import Model from './model'
import { Connection } from '../connection'

export default class User extends Model implements Base {
  static resource = 'users'

  constructor(args?: Object) {
    super(args);
  }

  get resource() {
    return User.resource
  }

  static me(): Promise<Object> {
    return Connection.get(`${this.resource}/me`)
  }

  static all(query?: Object): Promise<Object[]> {
    throw 'MethodNotAllowed'
  }

  static find(id: string | number, query?: Object): Promise<Object> {
    throw 'MethodNotAllowed'
  }
}
