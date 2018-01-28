import { Connection } from '../../connection';
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

  describe('with unexistant file', () => {
    it('should throw an error', () => {
      const cer = new Certificate({
        file: 'bad-certificate'
      })
      expect(cer.save).toThrowError()
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
