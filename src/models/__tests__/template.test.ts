import { Connection, Payload } from '../../connection';
import Mifiel from '../../';

jest.mock('../../connection')
const { Template } = Mifiel.Models

describe('create a template', () => {
  describe('with valid data', () => {
    it('should return 201 CREATED', () => {
      const template = new Template({
        name: 'some-name.pdf',
        content: '<div><field name="date" type="date">DATE</field></div>'
      })
      const spy = jest.spyOn(Connection, 'post')
      expect(template.save()).resolves.toHaveProperty('id')
      expect(spy).toHaveBeenCalledWith(
        'templates',
        expect.objectContaining({
          name: expect.stringMatching('some-name.pdf'),
          content: expect.stringContaining('DATE')
        }),
        0
      )
    })
  })

  describe('with bad request', () => {
    it('should return BAD_REQUEST', () => {
      const template = new Template({
        name: 'bad-name'
      })
      const spy = jest.spyOn(Connection, 'post')
      const promise = template.save()
      expect(promise).rejects.toHaveProperty('errors')
      return promise.catch((err) => {
        expect(err).toHaveProperty('errors')
        expect(err.errors[0]).toBe('Invalid name')
      })
    })
  })
})

describe('delete a template', () => {
  describe('a existent one', () => {
    it('should respond 200 OK', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new Template({ id: 'good-id' })
      const promise = tmp.delete()
      expect(promise).resolves.toHaveProperty('status')
      expect(spy).toHaveBeenCalledWith('templates/good-id')
      return promise.then((resp: Payload) => {
        expect(resp.status).toBe('success')
      })
    })
  })

  describe('a none existent one', () => {
    it('should respond 400 OK', () => {
      const spy = jest.spyOn(Connection, 'delete')
      const tmp = new Template({ id: 'not-found' })
      const promise = tmp.delete()
      expect(promise).rejects.toHaveProperty('errors')
      expect(spy).toHaveBeenCalledWith('templates/not-found')
      return promise.catch((resp: Payload) => {
        expect(resp.errors).toContain('does not exists')
      })
    })
  })
})

describe('get a template', () => {
  describe('a existent one', () => {
    it('should respond 200 OK', () => {
      const spy = jest.spyOn(Connection, 'get')
      const promise = Template.find('good-id')
      expect(promise).resolves.toHaveProperty('id')
      expect(spy).toHaveBeenCalledWith('templates/good-id')
      return promise.then((resp: Payload) => {
        expect(resp.id).toBe('good-id')
      })
    })
  })

  describe('a none existent one', () => {
    it('should respond 400 OK', () => {
      const spy = jest.spyOn(Connection, 'get')
      const promise = Template.find('not-found')
      expect(promise).rejects.toHaveProperty('errors')
      expect(spy).toHaveBeenCalledWith('templates/not-found')
      return promise.catch((resp: Payload) => {
        expect(resp.errors).toContain('does not exists')
      })
    })
  })
})

describe('get all templates',  () => {
  it('should fech all templates', () => {
    const spy = jest.spyOn(Connection, 'get')
    const promise = Template.all()
    expect(promise).resolves.toHaveLength(1)
  })
})

describe('#generateDocument', () => {
  it('should create a document from the template', () => {
    const template = new Template({ id: 'good-id' })
    const spy = jest.spyOn(Connection, 'post')
    template.generateDocument({
      name: 'document.pdf',
      fields: {
        name: 'My Client Name',
        date: 'Sep 27 2017'
      },
      signatories: [{
        name: 'Some name',
        email: 'some@email.com',
        tax_id: 'AAA010101AAA'
      }],
      callback_url: 'https://www.example.com/webhook/url',
      external_id: 'unique-id'
    })
    expect(spy).toHaveBeenCalledWith(
      'documents/good-id/generate_document',
      expect.objectContaining({
        name: expect.stringMatching('document.pdf'),
        callback_url: expect.stringContaining('example.com')
      })
    )
  })
})

describe('#documents', () => {
  it('should fetch documents from the template', () => {
    const template = new Template({ id: 'good-id' })
    const spy = jest.spyOn(Connection, 'get')
    template.documents()
    expect(spy).toHaveBeenCalledWith(
      'templates/good-id/documents'
    )
  })
})

describe('#generateDocuments', () => {
  it('should create several documents from the template', () => {
    const template = new Template({ id: 'good-id' })
    const spy = jest.spyOn(Connection, 'post')
    const identifier = 'name'
    const callback_url = 'https://www.my-site.com/documents-ready'
    const documents = [{
      fields: {
        name: 'My Client Name',
        date: 'Sep 27 2017'
      },
      signatories: [{
        name: 'Some Name',
        email: 'some@email.com',
        tax_id: 'AAA010101AAA'
      }],
      callback_url: 'https://www.my-site.com/sign-webhook',
      external_id: 'unique-id'
    }]
    template.generateDocuments(callback_url, documents, identifier)
    expect(spy).toHaveBeenCalledWith(
      'documents/good-id/generate_documents',
      expect.objectContaining({
        identifier: expect.stringMatching('name'),
        documents: expect.anything(),
        callback_url: expect.stringMatching('my-site')
      })
    )
  })
})
