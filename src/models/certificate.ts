import * as fs from 'fs'

import Base from './base'
import { Payload, Model } from './model'

export default class Certificate extends Model implements Base {
  multipart = true
  static resource = 'keys'

  constructor(args?: Payload) {
    super(args);
  }

  get resource() {
    return Certificate.resource
  }

  save(): Promise<object> {
    if (this.properties.file) {
      this.properties.cer_file = fs.createReadStream(this.properties.file);
    }
    return super.save()
  }
}
