import AES from '../aes';
import * as fs from 'fs'
import { util } from 'node-forge'
const aesFixture = JSON.parse(fs.readFileSync('test/fixtures/aes.json', 'utf8'));


describe('#Valid data', () => {
  describe('valid AES encrypt & decrypt', () => {
		aesFixture.valid.forEach((item) => {
			describe(JSON.stringify(item), () => {
				const { key, iv, dataToEncrypt, encrypted } = item
				it('Should encrypt data', () => {
					expect(AES.encrypt({key, iv, message: dataToEncrypt})).toEqual(encrypted)
				})
				it('Should decrypt data', () => {
					expect(AES.decrypt({key, iv, cipherText: util.binary.hex.decode(encrypted) })).toEqual(dataToEncrypt)
				})
			})
		})
  })

  describe('Generate Random IV', () => {
  	it('Should generate random bytes', () => {
			expect(AES.randomIv() == AES.randomIv()).toBeFalsy()
			expect(AES.randomIv().length).toEqual(16)
			expect(AES.randomIv(32).length).toEqual(32)
			expect(typeof AES.randomIv()).toEqual('string')
  	})
  })  
})
