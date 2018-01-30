import Base from './base'
import { TYPES, Connection } from '../connection'

export default abstract class Model implements Base {
  multipart: boolean
  static resource: string
  protected properties: any

  constructor(args: Object) {
    this.properties = args || {}
  }

  abstract get resource(): string

  static all(query? :Object): Promise<Array<Object>> {
    return Connection.get(this.resource, query)
  }

  static find(id: string | number, query?: Object): Promise<Object> {
    return Connection.get(`${this.resource}/${id}`)
  }

  delete(): Promise<Object> {
    if (!this.properties.id) {
      throw 'To delete the model you must instantiate it with an id'
    }
    return Connection.delete(`${this.resource}/${this.properties.id}`)
  }

  save(): Promise<Object> {
    if (this.properties.id) {
      return Connection.put(`${this.resource}/${this.properties.id}`, this.properties)
    }
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
