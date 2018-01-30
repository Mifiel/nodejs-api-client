import * as request from 'request'
import * as Crypto from 'crypto'

import ApiAuth from './api-auth'
import Config from './config'

export enum TYPES {
  'json',
  'multipart'
}

export interface Payload {
  [selector: string]: object | string
}

export class Connection {
  static post(path: string, payload: Payload | Array<Payload>, type?: number): Promise<any> {
    const options: request.Options = {
      url: path,
      method: 'POST'
    }
    if (type === TYPES.multipart) {
      options.formData = payload
    } else {
      options.json = payload
    }
    return this.execute(options)
  }

  static get(path: string, query?: Object): Promise<any> {
    return this.execute({
      url: path,
      method: 'GET',
      qs: query
    })
  }

  static delete(path: string): Promise<any> {
    return this.execute({
      url: path,
      method: 'DELETE'
    })
  }

  static put(path: string, payload: Payload): Promise<any> {
    return this.execute({
      url: path,
      method: 'PUT'
    })
  }

  private static execute(options: any): Promise<any> {
    if (options.url[0] !== '/') {
      options.url = `/${options.url}`
    }
    options.baseUrl = Config.url
    return new Promise((resolve, reject) => {
      options.callback = this.callbackHandler(resolve, reject)
      const req = request(options)
      const apiAuth = new ApiAuth(req)
      apiAuth.init(Config.appID, Config.appSecret)
      apiAuth.onRequest()
    })
  }

  private static callbackHandler(resolve: Function, reject: Function) {
    return (error: Error, response: any, body: any) => {
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

  private static parseBody(body: any): Object {
    try {
      return JSON.parse(body)
    } catch (e) {
      return body
    }
  }
}
