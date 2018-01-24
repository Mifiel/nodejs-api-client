import Base from './base'
import { TYPES, Connection } from '../connection'

export default class Model implements Base {
  multipart: boolean = null;
  resource: string = null;
  protected properties: any

  constructor(args: Object) {
    this.properties = args;
  }

  save(): Promise<Object> {
    let type = TYPES.json
    if (this.multipart) {
      type = TYPES.multipart
    }
    return Connection.post(this.resource, this.properties, type)
  }
}
