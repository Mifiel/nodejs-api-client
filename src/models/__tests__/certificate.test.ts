import { Payload, Connection } from '../../connection';
import Mifiel from '../../'

jest.mock('../../connection')
const { Certificate } = Mifiel.Models

describe('create a certificate', () => {
  describe('with a file', () => {
    it('should return 201 CREATED', () => {
      const cer = new Certificate({
        file: './test/fixtures/FIEL_FISICA.cer'
      })
      const spy = jest.spyOn(Connection, 'post')
      expect(cer.save()).resolves.toHaveProperty('cer_hex')
      expect(spy).toHaveBeenCalledWith(
        'keys',
        expect.objectContaining({
          cer_file: expect.anything()
        }),
        1
      )
    })
  })

  describe('without a file', () => {
    it('should POST it', () => {
      const cer = new Certificate()
      const spy = jest.spyOn(Connection, 'post')
      expect(cer.save()).resolves.toHaveProperty('cer_hex')
      expect(spy).toHaveBeenCalledWith('keys', {}, 1)
    })
  })

  describe('with unexistant file', () => {
    it('should throw an error', () => {
      const cer = new Certificate({
        file: 'bad-certificate'
      })
      expect(cer.save).toThrowError()
    })
  })
})

describe('delete a certificate', () => {
  describe('a existent one', () => {
    it('should respond 200 OK', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new Certificate({ id: 'good-id' })
      const promise = tmp.delete()
      expect(promise).resolves.toHaveProperty('status')
      expect(spy).toHaveBeenCalledWith('keys/good-id')
      return promise.then((resp: Payload) => {
        expect(resp.status).toBe('success')
      })
    })
  })

  describe('a none existent one', () => {
    it('should respond 400 OK', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new Certificate({ id: 'not-found' })
      const promise = tmp.delete()
      expect(promise).rejects.toHaveProperty('errors')
      expect(spy).toHaveBeenCalledWith('keys/not-found')
      return promise.catch((resp: Payload) => {
        expect(resp.errors).toContain('does not exists')
      })
    })
  })
})

describe('get all certificates',  () => {
  it('should fech all docs', () => {
    const spy = jest.spyOn(Connection, 'get')
    const promise = Certificate.all()
    expect(promise).resolves.toHaveLength(1)
  })
})
