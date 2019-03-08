import PKCS5 from '../pkcs5';
import * as fs from 'fs'
import * as pry from 'pryjs'
import { util, asn1 as forgeAsn1 } from 'node-forge'
const pbkdfFixture = JSON.parse(fs.readFileSync('test/fixtures/pbkdf2.json', 'utf8'));
const pkcs5Fixture = JSON.parse(fs.readFileSync('test/fixtures/pkcs5.json', 'utf8'));

describe('#Valid data', () => {
  describe('valid pbkdf2', () => {
		pbkdfFixture.valid.forEach((item) => {
			describe(JSON.stringify(item), () => {
				const { password, salt, keySize, iterations } = item
				it('Should return strong key', () => {
					expect(
						PKCS5.pbkdf2({ password, salt, keySize, iterations }).toString('hex')
					).toEqual(item.result)
				})
			})
		})
  })
})

describe('valid asn1 parsing & building', () => {
	pkcs5Fixture.valid.forEach((item) => {
		describe(JSON.stringify(item), () => {
			const { asn1 } = item
			const derObj = PKCS5.parse(util.hexToBytes(asn1));
			it('Should parse asn1', () => {
				expect(derObj.toHex()).toEqual(asn1);
			})
			it('Should build asn1 with given properties', () => {
				const properties = Object.assign({}, derObj.values)
				properties.asn1 = undefined
				const derObj2 = new PKCS5(properties);
				expect(derObj2.iv).toEqual(properties.iv);
				expect(derObj2.salt).toEqual(properties.salt);
				expect(derObj2.cipherText).toEqual(properties.cipherText);
				expect(derObj2.iterations).toEqual(properties.iterations);
				expect(derObj2.cipher).toEqual(properties.cipher);
				expect(derObj2.digest).toEqual(properties.digest);
				expect(derObj2.toHex()).toEqual(derObj.toHex());
				expect(derObj2.toDer()).toEqual(derObj.toDer());
			})
		})
	})
})
