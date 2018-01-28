import { Connection, Payload } from '../../connection';
import Mifiel from '../../';

jest.mock('../../connection')
const { User } = Mifiel.Models;

describe('create a user', () => {
  describe('valid one', () => {
    it('should return 201 CREATED', () => {
      const doc = new User({
        email: 'good@email.com'
      })
      const spy = jest.spyOn(Connection, 'post')
      expect(doc.save()).resolves.toHaveProperty('id')
      expect(spy).toHaveBeenCalledWith(
        'users',
        expect.objectContaining({
          email: expect.stringContaining('good@email.com')
        }),
        0
      )
    })
  })

  describe('with bad request', () => {
    it('should return BAD_REQUEST', () => {
      const doc = new User({
        email: 'bad@email.com'
      })
      const spy = jest.spyOn(Connection, 'post')
      const promise = doc.save()
      expect(promise).rejects.toHaveProperty('errors')
      return promise.catch((err) => {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0]).toBe('Invalid user')
      })
    })
  })
})

describe('#me', () => {
  it('should fetch my data', () => {
    expect(User.me()).resolves.toHaveProperty('name')
  })
})

describe('find a users',  () => {
  it('should throw MethodNotAllowed', () => {
    expect(User.find).toThrowError()
  })
})

describe('get all users',  () => {
  it('should throw MethodNotAllowed', () => {
    expect(User.all).toThrowError()
  })
})
