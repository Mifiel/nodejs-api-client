import Crypto from '../crypto';
import Document from '../../models/document';
import PKCS5 from '../pkcs5';
import * as fs from 'fs'
import * as crypto from 'crypto'

const asn1File = fs.readFileSync('test/fixtures/test-paged.pdf.enc')
const pdf = fs.readFileSync('test/fixtures/test-paged.pdf')
const password = 'super-strong'
const getHash = function (data) {
	  const sha256 = crypto.createHash('sha256')
    sha256.update(data)
    return sha256.digest('hex')
}

describe('#Decrypt', () => {
	it('decrypt from asn1 file', () => {
		const pdfAgain = Crypto.decrypt(Crypto.hexToBytes(asn1File.toString('hex')), password)
		expect(Buffer.from(pdfAgain, 'hex')).toEqual(pdf)
		expect(Document.getHash('test/fixtures/test-paged.pdf')).toEqual(getHash(Buffer.from(pdfAgain, 'hex')));
	})

	it('Encrypt from pdf file', () => {
		const encryptedPkcs5 = Crypto.encrypt(pdf.toString('hex'), password)
		expect(encryptedPkcs5).toBeInstanceOf(PKCS5)
	})
})
