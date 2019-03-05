import ECIES from '../ecies';
import * as fs from 'fs'
import { util } from 'node-forge'
import * as crypto from 'crypto'

const eciesFixture = JSON.parse(fs.readFileSync('test/fixtures/ecies.json', 'utf8'));
const failure = false
console.log('#Valid data');
console.log('\tvalid ECIES encrypt & decrypt')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const beginTest = async () => {
	await asyncForEach(eciesFixture.valid, async (item)=> {
		const { privateKey, decrypted, encryptedData, publicKeyUncompress } = item
		console.log('\tShould encrypt data');
			const encrypted  = await ECIES.encrypt(Buffer.from(publicKeyUncompress, 'hex'), decrypted);
			const plaintext = await ECIES.decrypt(Buffer.from(privateKey, 'hex'), encrypted);
			console.log('\t\t' + (plaintext.toString() == decrypted))
		console.log('\tShould decrypt data')
			const plainText = await ECIES.decrypt(Buffer.from(privateKey,'hex'), ECIES.toBuffer(encryptedData))
			console.log('\t\t'+ (plainText.toString() == decrypted))
	})
}
beginTest()
