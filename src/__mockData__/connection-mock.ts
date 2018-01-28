interface Model {
  [modelName: string]: any
}

const models: Model = {
  documents: [{
    id: 'good-id',
    original_hash: 'original-hash'
  }],
  keys: [{
    id: 'good-id',
    cer_hex: 'certificate-hex-string'
  }],
  users: [{
    id: 'good-id',
    name: 'Jonh Doe',
    email: 'good@email.com'
  }]
}

models['users/me'] = models.users[0]

export const mocks = {
  get: (name: string) => {
    return models[name]
  }
}

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
  },
  users: {
    email: {
      key: 'bad@email.com',
      error: 'Invalid user'
    }
  },
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
