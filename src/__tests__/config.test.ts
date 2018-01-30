import Mifiel from '../'

describe('#setTokens', () => {
  it('should update the tokens', () => {
    Mifiel.Config.setTokens('appId', 'secret')
    expect(Mifiel.Config.appID).toBe('appId')
    expect(Mifiel.Config.appSecret).toBe('secret')
  })
})

describe('#set url', () => {
  it('should change the url', () => {
    expect(Mifiel.Config.url).toContain('www.mifiel.com')
    Mifiel.Config.url = 'https://sandbox.mifiel.com'
    expect(Mifiel.Config.url).toContain('sandbox.mifiel.com')
  })
})
