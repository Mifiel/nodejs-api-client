import ApiAuth from '../api-auth'

interface RequestProps extends Object {
  contentType: string
  method: string
  path: string
}

const DATE_TO_USE = new Date('2016')
const _Date = Date
global.Date = jest.fn(() => DATE_TO_USE)
global.Date.UTC = _Date.UTC
global.Date.parse = _Date.parse
global.Date.now = _Date.now

const mockRequest = (args?: RequestProps) => {
  if (!args)
    args = {
      contentType: 'application/json',
      method: 'GET',
      path: 'some/path'
    }
  const request = Object.assign(args, {
    headers: {},
    _form: {
      getHeaders: () => {
        return {
          'content-type': args.contentType
        }
      }
    },
    setHeader: (name, value) => {
      request.headers[name] = value
    },
    getHeader: (name) => {
      return request.headers[name]
    }
  })
  return request
}

describe('everything ok', () => {
  it('should update the tokens', () => {
    const req = mockRequest({
      contentType: 'application/json',
      method: 'POST',
      path: 'api/v1/documents'
    })
    const apiAuth = new ApiAuth(req)
    apiAuth.init('app-id', 'app-ecret')
    apiAuth.onRequest()
    expect(req.getHeader('Authorization')).toBe('APIAuth app-id:53+TzSOCDKoisvIaWDFB+/+WcRk=')
    expect(req.getHeader('Date')).toBe(new Date().toUTCString())
    expect(req.getHeader('Content-Type')).toBe('application/json')
    expect(req.getHeader('Content-MD5')).toBe('')
  })
})
