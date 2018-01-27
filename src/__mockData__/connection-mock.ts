interface Model {
  [modelName: string]: Array<Object>
}

const models: Model = {
  documents: [{
    id: 'good-id',
    original_hash: 'original-hash'
  }],
  keys: [{
    id: 'good-id',
    cer_hex: 'certificate-hex-string'
  }]
}

export const mocks = {
  get: (name: string) => {
    return models[name]
  }
}

type Index = 'documents' | 'keys' | 'templates'

interface Err {
  key: string,
  error: string
}

interface ErrorObject {
  [modelName: string]: {
    [key: string]: Err
  }
}

const errors: ErrorObject = {
  documents: {
    original_hash: {
      key: 'bad-hash',
      error: 'Not a valid hash'
    }
  }
}

export const requestErrors = {
  get: {
    notFoundId: 'not-found'
  },
  post: {
    models: (resource: string) => {
      return {
        exists: () => {
          return !!errors[resource]
        },
        resp: (prop: string): Err => {
          return errors[resource][prop]
        }
      }
    }
  }
}
