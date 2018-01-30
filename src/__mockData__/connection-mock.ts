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
  }],
  templates: [{
    id: 'good-id',
    name: 'Some Template',
    content: '<div><field name="date" type="date">DATE</field></div>'
  }],
  'test-model': [{
    id: 'some-id'
  }]
}

models['users/me'] = models.users[0]
models['users/setup-widget'] = { widget_id: 'some-widget-id' }
models['documents/good-id'] = models.documents[0]
models['templates/good-id'] = models.templates[0]
models['test-model/some-id'] = models['test-model'][0]
models['documents/good-id/generate_document'] = models.documents[0]
models['documents/good-id/generate_documents'] = { status: 'success' }

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
  templates: {
    name: {
      key: 'bad-name',
      error: 'Invalid name'
    }
  }
}

export const requestErrors = {
  get: {
    notFoundId: 'not-found'
  },
  post: {
    getModel: (resource: string) => {
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
