import ECIES from '../ecies';
import * as fs from 'fs'
import { util } from 'node-forge'
import * as ecc from 'eccrypto'
import * as crypto from 'crypto'

const eciesFixture = JSON.parse(fs.readFileSync('test/fixtures/ecies.json', 'utf8'));

describe('#Valid data', () => {
	describe('valid ECIES encrypt & decrypt', () => {
		// eciesFixture.valid.forEach((item) => {
			const item = eciesFixture.valid[0]
			describe(JSON.stringify(Object.assign({}, item.encryptedData, item.decrypted)), () => {
				const { privateKey, decrypted, encryptedData, publicKeyUncompress } = item
				it('Should encrypt data', async () => {
					return ECIES.encrypt(Buffer.from(item.publicKeyUncompress, 'hex'), decrypted).then(function(encrypted) {
					  // B decrypting the message.
					  return ECIES.decrypt(Buffer.from(privateKey, 'hex'), encrypted).then(function(plaintext) {
					    console.log("Message to part B:", plaintext.toString());
					  });
					});
				// 	const priv = crypto.randomBytes(32);
				// 	// const encrypted  = await ECIES.encrypt(Buffer.from(publicKeyUncompress, 'hex'), decrypted);
				// 	// const plaintext = await ECIES.decrypt(Buffer.from(privateKey, 'hex'), encrypted);
				// 	// expect(plaintext.toString()).toEqual(decrypted)
				})
				// it('Should decrypt data', async () => {
				// 	const plainText = await ECIES.decrypt(Buffer.from(privateKey,'hex'), ECIES.toBuffer(encryptedData))
				// 	expect(plainText.toString()).toEqual(decrypted)
				// })
			})
		// })
	})
})
