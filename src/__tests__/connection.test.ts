import { TYPES, Connection } from '../connection'
import ApiAuth from '../api-auth'
import Config from '../config'

jest.mock('request')

import * as request from 'request'

Config.setTokens('appId', 'appSecret')
afterEach(request.__clearCbkRespnse)

describe('#post with multipart', () => {
  it('should send a multipart header', () => {
    const spy = jest.spyOn(Connection, 'execute')
    Connection.post('documents', { name: 'some.pdf' }, TYPES.multipart)
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      url: expect.stringMatching('documents'),
      method: expect.stringMatching('POST'),
      formData: expect.objectContaining({ name: expect.stringMatching('some.pdf') })
    }))
  })
})

const methods = ['post', 'put', 'get', 'delete']
methods.forEach(method => {
  describe(`#${method}`, () => {
    describe('correct', () => {
      it('should resolve the promise', () => {
        request.__setCbkResponse({
          body: {
            status: 'success'
          }
        })
        const spyInit = jest.spyOn(ApiAuth.prototype, 'init')
        const spyOnRequest = jest.spyOn(ApiAuth.prototype, 'onRequest')
        const promise = Connection[method]('some/path', {})
        expect(spyInit).toHaveBeenCalled()
        expect(spyOnRequest).toHaveBeenCalled()
        return promise.then(resp => {
          expect(resp).toHaveProperty('status')
          expect(resp.status).toBe('success')
        })
      })
    })

    describe('conection error', () => {
      it('should resolve the promise', () => {
        request.__setCbkResponse({
          error: 'Errors'
        })
        const spyInit = jest.spyOn(ApiAuth.prototype, 'init')
        const spyOnRequest = jest.spyOn(ApiAuth.prototype, 'onRequest')
        const promise = Connection[method]('some/path', {})
        expect(spyInit).toHaveBeenCalled()
        expect(spyOnRequest).toHaveBeenCalled()
        return promise.catch(err => {
          expect(err).toBe('Errors')
        })
      })
    })

    describe('server error response', () => {
      it('should resolve the promise', () => {
        request.__setCbkResponse({
          error: null,
          response: {
            statusCode: 500,
            statusMessage: 'Internal Server Error'
          },
          body: {
            errors: ['Some Errors']
          }
        })
        const spyInit = jest.spyOn(ApiAuth.prototype, 'init')
        const spyOnRequest = jest.spyOn(ApiAuth.prototype, 'onRequest')
        const promise = Connection[method]('some/path', {})
        expect(spyInit).toHaveBeenCalled()
        expect(spyOnRequest).toHaveBeenCalled()
        return promise.catch(err => {
          expect(err).toHaveProperty('status')
          expect(err).toHaveProperty('error')
          expect(err.status.code).toBe(500)
          expect(err.error.errors[0]).toEqual('Some Errors')
        })
      })
    })
  })
})
