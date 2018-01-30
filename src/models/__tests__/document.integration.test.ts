jest.dontMock('request')

import * as nock from 'nock'
import * as request from 'request'
import Mifiel from '../../'
import ApiAuth from '../../api-auth'
const { Document } = Mifiel.Models

nock.disableNetConnect()

const apiAuth = new ApiAuth()

beforeAll(() => {
  Mifiel.Config.setTokens('appId', 'appSecret')
  Mifiel.Config.url = 'https://www.mifiel.com/api/v1'
  apiAuth.init(Mifiel.Config.appID, Mifiel.Config.appSecret)
})

describe('ccreate a document', () => {
  describe('when everything went ok', () => {
    it('should make the request', () => {
      const create = nock('https://www.mifiel.com')
        .post('/api/v1/documents')
        .reply(function (uri: string, requestBody: any) {
          const headers = apiAuth.buildHeaders('POST', this.req.headers['content-type'], '/api/v1/documents')
          expect(this.req.headers.authorization).toEqual(headers.authorization)
          return [201, { id: 'document-id' }]
        })

      const doc = new Document({
        file: './test/fixtures/test-paged.pdf',
        signatories: [{
          email: 'some@email.com'
        }]
      })

      return doc.save().then((resp: any) => {
        expect(resp).toHaveProperty('id')
        expect(resp.id).toEqual('document-id')
        create.done()
      })
    })
  })

  describe('when bad request', () => {
    it('should make the request', () => {
      const create = nock('https://www.mifiel.com')
        .post('/api/v1/documents')
        .reply(function (uri: string, requestBody: any) {
          const headers = apiAuth.buildHeaders('POST', this.req.headers['content-type'], '/api/v1/documents')
          expect(this.req.headers.authorization).toEqual(headers.authorization)
          return [400, { errors: ['Some bad error'] }]
        })

      const doc = new Document({
        file: './test/fixtures/test-paged.pdf',
        signatories: [{
          email: 'some@email.com'
        }]
      })

      return doc.save().catch((err: any) => {
        expect(err).toHaveProperty('status')
        expect(err.error).toHaveProperty('errors')
        create.done()
      })
    })
  })
})
