import { Connection } from '../../connection';
import Mifiel from '../../'

jest.mock('../../connection')

describe('save certificate', () => {
  it('should return 201 CREATED', () => {
    const cert = new Mifiel.Models.Certificate({
      file: './test/fixtures/FIEL_FISICA.cer'
    })
    cert.save().then(resp => {
      expect(resp).toHaveProperty('cer_hex')
    }).catch(err => {
      console.error(err)
    })
  })
})
