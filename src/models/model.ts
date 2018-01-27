import Base from './base'
import { TYPES, Connection } from '../connection'

export default abstract class Model implements Base {
  multipart: boolean = null;
  static resource: string
  protected properties: any

  constructor(args: Object) {
    this.properties = args;
  }

  abstract get resource(): string

  static find(id: string | number, query?: Object): Promise<Object> {
    return Connection.get(this.resource, { id: id })
  }

  save(): Promise<Object> {
    let type = TYPES.json
    if (this.multipart) {
      type = TYPES.multipart
    }
    for (const property in this.properties) {
      const val = this.properties[property]
      if (val instanceof Array || val instanceof Object) {
        this.properties[property] = JSON.stringify(val)
      }
    }
    return Connection.post(this.resource, this.properties, type)
  }
}
