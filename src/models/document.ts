import * as Crypto from 'crypto'
import * as fs from 'fs'

import Base from './base'
import { Payload, Model } from './model'
import { Connection } from '../connection'

export default class Document extends Model implements Base {
  multipart = false
  static resource = 'documents'

  constructor(args?: Payload) {
    super(args)
  }

  get resource() {
    return Document.resource
  }

  static delete(id: string): Promise<object> {
    const doc = new Document({ id: id })
    return doc.delete()
  }

  static createFromTemplate(args: any): Promise<object> {
    const url = `${this.resource}/${args.template_id}/generate_document`
    delete args.template_id
    return Connection.post(url, args)
  }

  static createManyFromTemplate(args: any): Promise<Array<object>> {
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

  save(): Promise<object> {
    if (this.properties.file) {
      this.multipart = true
      this.properties.file = fs.createReadStream(this.properties.file)
    }
    return super.save()
  }

  saveFile(path: string): Promise<boolean> {
    return this.getAndSaveFile(`${this.resource}/${this.properties.id}/file`, path, null)
  }

  saveFileSigned(path: string): Promise<boolean> {
    return this.getAndSaveFile(`${this.resource}/${this.properties.id}/file_signed`, path, null)
  }

  saveXML(path: string): Promise<boolean> {
    return this.getAndSaveFile(`${this.resource}/${this.properties.id}/xml`, path)
  }

  private getAndSaveFile(url: string, path: string, encoding?: string): Promise<boolean> {
    if (encoding === undefined) {
      encoding = 'utf8'
    }
    const opts = { url: url, method: 'GET', encoding: encoding }
    return Connection.execute(opts).then(data => {
      const writeStream = fs.createWriteStream(path, { encoding: encoding })
      writeStream.write(data)
      writeStream.end()
      return true
    })
  }
}
