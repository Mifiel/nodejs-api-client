import * as fs from 'fs'

import Base from './base'
import { TYPES, Connection } from '../connection'

export interface Payload {
  [selector: string]: any
}

export abstract class Model implements Base {
  multipart: boolean
  static resource: string
  protected properties: Payload

  constructor(args: Payload) {
    this.properties = args || {}
  }

  abstract get resource(): string

  static all(query?: object): Promise<Array<object>> {
    return Connection.get(this.resource, query)
  }

  static find(id: string | number, query?: object): Promise<object> {
    return Connection.get(`${this.resource}/${id}`)
  }

  delete(): Promise<object> {
    if (!this.properties.id) {
      throw 'To delete the model you must instantiate it with an id'
    }
    return Connection.delete(`${this.resource}/${this.properties.id}`)
  }

  save(): Promise<object> {
    if (this.properties.id) {
      return Connection.put(`${this.resource}/${this.properties.id}`, this.properties)
    }
    let type = TYPES.json
    if (this.multipart) {
      type = TYPES.multipart
    }
    this.cleanupPostParams()
    return Connection.post(this.resource, this.properties, type)
  }

  private cleanupPostParams() {
    for (const property in this.properties) {
      const val = this.properties[property]
      const isStream = val instanceof fs.ReadStream
      if (!isStream && (val instanceof Array || val instanceof Object)) {
        this.properties[property] = JSON.stringify(val)
      }
    }
  }
}
