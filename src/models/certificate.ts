import * as fs from 'fs'

import Base from './base'
import { Payload, Model } from './model'
import { Connection } from '../connection'

export default class Certificate extends Model implements Base {
  multipart = true
  static resource = 'keys'

  constructor(args?: Payload) {
    super(args);
  }

  get resource() {
    return Certificate.resource
  }

  static delete(id: string): Promise<object> {
    const cer = new Certificate({ id: id })
    return cer.delete()
  }

  save(): Promise<object> {
    if (this.properties.file) {
      this.properties.cer_file = fs.createReadStream(this.properties.file);
    }
    return super.save()
  }
}
