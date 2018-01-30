import * as Crypto from 'crypto'
import * as fs from 'fs'

import Base from './base'
import Model from './model'
import { Connection } from '../connection'

export default class Document extends Model implements Base {
  multipart = false
  static resource = 'documents'

  constructor(args?: Object) {
    super(args);
  }

  get resource() {
    return Document.resource
  }

  static createFromTemplate(args: any): Promise<Object> {
    const url = `${this.resource}/${args.template_id}/generate_document`
    delete args.template_id
    return Connection.post(url, args)
  }

  static createManyFromTemplate(args: any): Promise<Array<Object>> {
    const url = `${this.resource}/${args.template_id}/generate_documents`
    delete args.template_id
    return Connection.post(url, args)
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
