import Base from './base'
import Model from './model'

export default class User extends Model implements Base {
  static resource = 'users'

  constructor(args?: Object) {
    super(args);
  }

  get resource() {
    return User.resource
  }
}
