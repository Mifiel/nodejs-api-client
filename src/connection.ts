import * as request from 'request'
import * as Crypto from 'crypto'

import ApiAuth from './api-auth'
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
        baseUrl: Config.url,
        method: 'POST',
        callback: (error, response, body) => {
          if (error) {
            return reject(error)
          }
          if (response.statusCode >= 200 && response.statusCode < 300) {
            return resolve(this.parseBody(body))
          }
          reject({
            status: {
              code: response.statusCode,
              message: response.statusMessage
            },
            error: this.parseBody(body)
          })
        }
      }
      if (type === TYPES.multipart) {
        options.formData = payload
      } else {
        options.json = payload
      }
      const req = request(options)
      const apiAuth = new ApiAuth(req)
      apiAuth.init(Config.appID, Config.appSecret)
      apiAuth.onRequest()
    })
  }

  private static parseBody(body: any): Object {
    try {
      return JSON.parse(body)
    } catch (e) {
      return body
    }
  }
}
