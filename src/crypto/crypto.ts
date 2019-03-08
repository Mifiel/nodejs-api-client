import { util, cipher, random } from 'node-forge'
import AES  from './aes'
import PKCS5  from './pkcs5'

export default class Crypto  {

	static encrypt(document: string, password): PKCS5 {
		const params  = { salt: AES.randomIv(8), iterations: 1000 }
		const key = PKCS5.pbkdf2(Object.assign({}, params, {password})).toString('hex');
		const aesParams = { key, iv: AES.randomIv(), message: document }
		const cipherText = AES.encrypt(aesParams)
		Object.assign(params, { cipherText, iv: aesParams.iv })
		return new PKCS5(params)
	}

	static decrypt(asn1: string, password:string): string {
		const pkcs5 = PKCS5.parse(asn1)
		const params = Object.assign({}, { password }, pkcs5.values)
		params.asn1 = undefined;
		const key = PKCS5.pbkdf2(params).toString('hex');
		const aesParams = { key, iv: params.iv, cipherText: params.cipherText }
		return AES.decrypt(aesParams);
	}

	static hexToBytes(data:string) {
		return util.hexToBytes(data);
	}
}
