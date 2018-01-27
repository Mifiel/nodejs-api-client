import * as Crypto from 'crypto';
import * as fs from 'fs'

import Base from './base'
import Model from './model'

export default class Document extends Model implements Base {
  multipart = false
  static resource = 'documents'

  constructor(args?: Object) {
    super(args);
  }

  get resource() {
    return Document.resource
  }

  static getHash(filename: string) {
    const file = fs.readFileSync(filename)
    const sha256 = Crypto.createHash('sha256')
    sha256.update(file)
    return sha256.digest('hex')
  }

  save(): Promise<Object> {
    if (this.properties.file) {
      this.multipart = true
      this.properties.file = fs.createReadStream(this.properties.file)
    }
    return super.save()
  }
}
