import Base from './base'
import Model from './model'
import Document from './document'
import { Connection } from '../connection'

export default class Template extends Model implements Base {
  multipart = false
  static resource = 'templates'

  constructor(args?: Object) {
    super(args);
  }

  documents(): Promise<Array<Object>> {
    return Connection.get(`${this.resource}/${this.properties.id}/documents`)
  }

  generateDocument(args?: Object): Promise<Object> {
    return Document.createFromTemplate(Object.assign({}, args, {template_id: this.properties.id }))
  }

  generateDocuments(callback_url: string, documents: Array<Object>, identifier?: string): Promise<Array<Object>> {
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
