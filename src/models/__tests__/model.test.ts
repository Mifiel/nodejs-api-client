import { Payload, Connection } from '../../connection';
import { Model } from '../model'

jest.mock('../../connection')

export default class ModelTest extends Model {
  resource = 'test-model'
}

describe('#delete', () => {
  describe('without an id', () => {
    it('should throw an error', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new ModelTest({})
      expect(() => tmp.delete()).toThrowError('must instantiate it with an id')
      expect(spy).not.toHaveBeenCalled()
    })
  })
})

describe('#get', () => {
  describe('without an id', () => {
    it('should make a put', () => {
      const spy = jest.spyOn(Connection, 'post')
      const tmp = new ModelTest({})
      const promis = tmp.save()
      expect(spy).toHaveBeenCalledWith('test-model', {}, 0)
      return promis.then(resp => {
        expect(resp).toMatchObject({ id: 'some-id' })
      })
    })
  })

  describe('with an id', () => {
    it('should make a put', () => {
      const spy = jest.spyOn(Connection, 'put')
      const tmp = new ModelTest({ id: 'some-id' })
      const promis = tmp.save()
      expect(spy).toHaveBeenCalledWith('test-model/some-id', { id: 'some-id' })
      return promis.then(resp => {
        expect(resp).toMatchObject(expect.objectContaining({
          message: 'Deleted',
          status: 'success'
        }))
      })
    })
  })
})
