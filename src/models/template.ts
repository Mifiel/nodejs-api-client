import Base from './base'
import { Payload, Model } from './model'
import Document from './document'
import { Connection } from '../connection'

export default class Template extends Model implements Base {
  multipart = false
  static resource = 'templates'

  constructor(args?: Payload) {
    super(args);
  }

  static delete(id: string): Promise<object> {
    const template = new Template({ id: id })
    return template.delete()
  }

  documents(): Promise<Array<object>> {
    return Connection.get(`${this.resource}/${this.properties.id}/documents`)
  }

  generateDocument(args?: object): Promise<object> {
    return Document.createFromTemplate(Object.assign({}, args, {template_id: this.properties.id }))
  }

  generateDocuments(callback_url: string, documents: Array<object>, identifier?: string): Promise<Array<object>> {
    return Document.createManyFromTemplate({
      template_id: this.properties.id,
      identifier: identifier,
      documents: documents,
      callback_url: callback_url
    })
  }

  get resource() {
    return Template.resource
  }
}
