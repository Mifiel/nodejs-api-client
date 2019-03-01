import * as ecc from 'eccrypto'

interface EcEncrypted {
	iv: Buffer | string
	ephemPublickKey: Buffer | string
	cipherText: Buffer | string
	mac: Buffer | string
}

export default class ECIES  {

	static async encrypt (pubKey: Buffer, data: string): Promise<EcEncrypted> {
		try {
			return await ecc.encrypt(pubKey, new Buffer(data));
		} catch (error) {
			throw new Error(error);
		}
	}

	static async decrypt (privKey: Buffer, data: EcEncrypted): Promise<Buffer> {
		try {
			return await ecc.decrypt(privKey, data);
		} catch (error) {
			if (error.message === 'Bad MAC') { error.message = 'Wrong priv'; }
			throw new Error(error);
		}
	}

	static toBuffer (data: EcEncrypted): EcEncrypted {
		const newData = Object.assign({}, data)
		for (const key in data) {
			if (key)
				newData[key] = new Buffer(newData[key], 'hex')
		}
		return newData;
	}
}
