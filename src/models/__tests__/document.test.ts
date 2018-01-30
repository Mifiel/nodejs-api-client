import { Connection, Payload } from '../../connection'
import Mifiel from '../../'

jest.mock('../../connection')
const { Document } = Mifiel.Models

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

describe('delete a document', () => {
  describe('a existent one', () => {
    it('should respond 200 OK', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new Document({ id: 'good-id' })
      const promise = tmp.delete()
      expect(promise).resolves.toHaveProperty('status')
      expect(spy).toHaveBeenCalledWith('documents/good-id')
      return promise.then((resp: Payload) => {
        expect(resp.status).toBe('success')
      })
    })
  })

  describe('a none existent one', () => {
    it('should respond 400 OK', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new Document({ id: 'not-found' })
      const promise = tmp.delete()
      expect(promise).rejects.toHaveProperty('errors')
      expect(spy).toHaveBeenCalledWith('documents/not-found')
      return promise.catch((resp: Payload) => {
        expect(resp.errors).toContain('does not exists')
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
      expect(spy).toHaveBeenCalledWith('documents/good-id')
      return promise.then((resp: Payload) => {
        expect(resp.id).toBe('good-id')
      })
    })
  })

  describe('an unexistent one', () => {
    it('should respond 404 NOT_FOUND', () => {
      const spy = jest.spyOn(Connection, 'get')
      const promise = Document.find('not-found')
      expect(promise).rejects.toHaveProperty('errors')
      expect(spy).toHaveBeenCalledWith('documents/not-found')
      return promise.catch((resp: Payload) => {
        expect(resp.errors).toContain('does not exists')
      })
    })
  })
})

describe('get all documents',  () => {
  it('should fech all docs', () => {
    const spy = jest.spyOn(Connection, 'get')
    const promise = Document.all()
    expect(promise).resolves.toHaveLength(1)
  })
})
