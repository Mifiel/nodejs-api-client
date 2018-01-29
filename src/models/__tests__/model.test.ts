import { Payload, Connection } from '../../connection';
import Model from '../model'

export default class ModelTest extends Model {
  resource = 'model-test'
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
  describe('with an id', () => {
    it('should make a put', () => {
      const spy = jest.spyOn(Connection, 'put')
      const tmp = new ModelTest({ id: 'some-id' })
      tmp.save()
      expect(spy).toHaveBeenCalledWith('model-test/some-id', { id: 'some-id' })
    })
  })
})
