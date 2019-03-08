import { util, cipher, random } from 'node-forge'

export default class AES  {

	static randomIv(size = 16) {
		return random.getBytesSync(size)
	}

	static encrypt(args: { message:string, iv:string, key: string }): string {
		const { key, message, iv } = args
		try {
			const eCipher = cipher.createCipher('AES-CBC', key);
			eCipher.start({ iv: iv });
			eCipher.update(util.createBuffer(message));
			eCipher.finish();
			return eCipher.output;

		} catch(err) {
			throw 'Something went wrong in AES encrypt'
		}
	}

	static decrypt(args: { cipherText:Uint8Array, iv:string, key: string }): string {
		const { cipherText, iv, key } = args
		try {
			const dCipher = cipher.createDecipher('AES-CBC', key);
			dCipher.start({ iv: iv });
			dCipher.update(util.createBuffer(cipherText));
			dCipher.finish();
			return dCipher.output.data;

		} catch (err) {
			throw 'Something went wrong in AES decrypt'
		}
	}
}
