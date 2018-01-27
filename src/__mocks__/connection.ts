import { mocks, requestErrors } from '../__mockData__/connection-mock'

export enum TYPES {
  'json',
  'multipart'
}

export interface Payload {
  [selector: string]: object | string
}

export class Connection {
  static post(path: string, payload: Payload, type?: number): Promise<any> {
    const reqError = requestErrors.post.models(path)
    if (reqError.exists()) {
      for (const key in payload) {
        const error = reqError.resp(key)
        if (error && payload[key] === error.key) {
          return Promise.reject({ errors: [error.error] })
        }
      }
    }
    return Promise.resolve(mocks.get(path)[0])
  }

  static get(path: string, query?: Payload): Promise<any> {
    if (query && query.id === requestErrors.get.notFoundId) {
      return Promise.reject({ errors: ['does not exists']  })
    }
    const mocked = mocks.get(path)
    const ret = query ? mocked[0] : mocked
    return Promise.resolve(ret)
  }
}
