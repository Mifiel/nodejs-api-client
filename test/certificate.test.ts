import Mifiel from '../src';

beforeEach(() => {
  Mifiel.Config.setTokens('testAppId', 'MySecret')
  Mifiel.Config.setUrl('http://localhost:3000/api/v1')
})

describe('save certificate', () => {
  it('should return 201 CREATED', () => {
    const cert = new Mifiel.Models.Certificate({
      file: './test/fixtures/FIEL_FISICA.cer'
    })
    expect(cert.save()).resolves.toHaveProperty('cer_hex')
  })
})
