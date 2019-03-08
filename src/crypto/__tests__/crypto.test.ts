import Crypto from '../crypto';
import Document from '../../models/document';
import AES from '../aes';
import PKCS5 from '../pkcs5';
import * as fs from 'fs'
import { util, asn1} from 'node-forge'
import * as crypto from 'crypto'

const asn1File = fs.readFileSync('test/fixtures/test-paged.pdf.enc')
const pdf = fs.readFileSync('test/fixtures/test-paged.pdf')
const password = 'super-strong'
const getHash = function (data) {
	  const sha256 = crypto.createHash('sha256')
    sha256.update(data)
    return sha256.digest('hex')
}

// const master = Crypto.fromSeedHexToBip32(widgetsFixture.masterSeed).toBase58()
// const keys = widgetsFixture.keys
// TODO: Move to WidgetCrypto tests
// describe('#Derive keys from widget', () => {
// 	widgetsFixture.ids.forEach((widgetId, idx) => {
// 		const { pub, priv, hardened } = keys[idx]
// 		it(`Should derive keyset ${priv} ${pub}`, () => {
// 			const docPath = 'test/fixtures/test-paged.pdf';
// 			const current = Crypto.deriveFromWidget({ key:master, widgetId, hardened })
// 			expect(current.privateKey.toString('hex')).toEqual(priv)
// 			expect(current.publicKey.toString('hex')).toEqual(pub)
// 		})
// 	})
// })
// describe('#Random master key', () => {
// 	it('Should generate random base58', () => {
// 		const key = Crypto.randomBip32()
// 		const key1 = Crypto.randomBip32()
// 		expect(key.toBase58() == key1.toBase58()).toBeFalsy()
// 	})
// })

describe('#Decrypt', () => {
	it('decrypt from asn1 file', () => {
		const pdfAgain = Crypto.decrypt(util.hexToBytes(asn1File.toString('hex')), password)
		expect(Buffer.from(pdfAgain, 'hex')).toEqual(pdf)
		expect(Document.getHash('test/fixtures/test-paged.pdf')).toEqual(getHash(Buffer.from(pdfAgain, 'hex')));
	})

	it('Encrypt from pdf file', () => {
		const encryptedPkcs5 = Crypto.encrypt(pdf.toString('hex'), password)
		expect(encryptedPkcs5).toBeInstanceOf(PKCS5)
	})
})
