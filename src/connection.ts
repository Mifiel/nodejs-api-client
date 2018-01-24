import * as request from 'request'
import Config from './config'

export enum TYPES {
  'json',
  'multipart'
}

export class Connection {
  static post(path: string, payload: Object | Array<any>, type?: number): Promise<any> {
    if (path[0] !== '/') {
      path = `/${path}`
    }
    return new Promise((resolve, reject) => {
      const options: request.Options = {
        url: path,
        baseUrl: Config.getUrl(),
        method: 'POST'
      }
      if (type === TYPES.multipart) {
        options.formData = payload
      } else {
        options.json = payload
      }
      request(options, (error, response, body) => {
        if (error) {
          return reject(error)
        }
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(JSON.parse(body))
        } else {
          reject({
            status: {
              code: response.statusCode,
              message: response.statusMessage
            },
            error: JSON.parse(body)
          })
        }
      })
    })
  }
}
