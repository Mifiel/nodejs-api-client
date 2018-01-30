import Base from './base'
import { Payload, Model } from './model'
import { Connection } from '../connection'

export default class User extends Model implements Base {
  static resource = 'users'

  constructor(args?: Payload) {
    super(args)
  }

  get resource() {
    return User.resource
  }

  static setupWidget(args: { email: string, tax_id: string, callback_url?: string}) {
    if (!args.email) throw 'email is required'
    if (!args.tax_id) throw 'tax_id is required'
    return Connection.post(`${this.resource}/setup-widget`, args)
  }

  static me(): Promise<object> {
    return Connection.get(`${this.resource}/me`)
  }

  static all(query?: object): Promise<object[]> {
    throw 'MethodNotAllowed'
  }

  static find(id: string | number, query?: object): Promise<object> {
    throw 'MethodNotAllowed'
  }
}
