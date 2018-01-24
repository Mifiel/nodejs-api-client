import Mifiel from '../src';
const { Document } = Mifiel.Models;

beforeEach(() => {
  Mifiel.Config.setTokens(
    '4530a1fcd11e20f381152832218704dafbccdc74',
    'SNMN2jyguErm18nuUmOcMNcZ7lh1+74ya8qQvQPbeHXNAUxrX+qCz7q7ePDMMZhe0da8TuY+WBx8taiLdmioYA=='
  )
  Mifiel.Config.setUrl('http://localhost:3000/api/v1')
})

describe('getHash', () => {
  it('should get the hash of the document', () => {
    const expected = '3a8591a1fe2b38f1eafdb34b27461c6d75a6a28bc3c80d659dd8c91dae07b845'
    const got = Document.getHash('./test/fixtures/test-paged.pdf')
    expect(got).toEqual(expected)
  })
})

describe('save document', () => {
  describe('with a file', () => {
    it('should return 201 CREATED', () => {
      const doc = new Document({
        file: './test/fixtures/test-paged.pdf',
        signatories: [{
          email: 'some-other@email.com'
        }]
      })
      expect(doc.save()).resolves.toHaveProperty('id')
    })
  })

  describe('with a hash', () => {
    it('should return 201 CREATED', () => {
      const doc = new Document({
        original_hash: Document.getHash('./test/fixtures/test-paged.pdf'),
        name: 'a-name.pdf',
        signatories: [{
          email: 'some-other@email.com'
        }]
      })
      expect(doc.save()).resolves.toHaveProperty('id')
    })
  })
})
