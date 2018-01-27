import { Connection, Payload } from '../../connection';
import Mifiel from '../../';

jest.mock('../../connection')
const { Document } = Mifiel.Models;

describe('getHash', () => {
  it('should get the hash of the document', () => {
    const expected = '3a8591a1fe2b38f1eafdb34b27461c6d75a6a28bc3c80d659dd8c91dae07b845'
    const got = Document.getHash('./test/fixtures/test-paged.pdf')
    expect(got).toEqual(expected)
  })
})

describe('create a document', () => {
  describe('with a file', () => {
    it('should return 201 CREATED', () => {
      const doc = new Document({
        file: './test/fixtures/test-paged.pdf',
        signatories: [{
          email: 'some@email.com'
        }]
      })
      const spy = jest.spyOn(Connection, 'post')
      expect(doc.save()).resolves.toHaveProperty('id')
      expect(spy).toHaveBeenCalledWith(
        'documents',
        expect.objectContaining({
          file: expect.anything(),
          signatories: expect.stringContaining('some@email.com')
        }),
        1
      )
    })
  })

  describe('with a hash', () => {
    it('should return 201 CREATED', () => {
      const doc = new Document({
        original_hash: Document.getHash('./test/fixtures/test-paged.pdf'),
        name: 'a-name.pdf',
        signatories: [{
          email: 'some@email.com'
        }]
      })
      const spy = jest.spyOn(Connection, 'post')
      expect(doc.save()).resolves.toHaveProperty('id')
      expect(spy).toHaveBeenCalledWith(
        'documents',
        expect.objectContaining({
          original_hash: expect.any(String),
          name: expect.any(String),
          signatories: expect.stringContaining('some@email.com')
        }),
        0
      )
    })
  })

  describe('with bad request', () => {
    it('should return BAD_REQUEST', () => {
      const doc = new Document({
        original_hash: 'bad-hash'
      })
      const spy = jest.spyOn(Connection, 'post')
      const promise = doc.save()
      expect(promise).rejects.toHaveProperty('errors')
      return promise.catch((err) => {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0]).toBe('Not a valid hash')
      })
    })
  })
})

describe('get a document', () => {
  describe('a existent one', () => {
    it('should respond 200 OK', () => {
      const spy = jest.spyOn(Connection, 'get')
      const promise = Document.find('good-id')
      expect(promise).resolves.toHaveProperty('id')
      expect(spy).toHaveBeenCalledWith(
        'documents',
        { id: 'good-id' }
      )
      promise.then((resp: Payload) => {
        expect(resp.id).toBe('good-id')
      })
    })
  })

  describe('a none existent one', () => {
    it('should respond 400 OK', () => {
      const spy = jest.spyOn(Connection, 'get')
      const promise = Document.find('not-found')
      expect(promise).rejects.toHaveProperty('errors')
      expect(spy).toHaveBeenCalledWith(
        'documents',
        { id: 'not-found' }
      )
      promise.catch((resp: Payload) => {
        expect(resp.errors).toContain('does not exists')
      })
    })
  })
})
