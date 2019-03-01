import { asn1, util, pki } from 'node-forge'
import { Payload, Model } from '../models/model'
import { pbkdf2Sync } from 'crypto'
import * as pry from 'pryjs'

export default class PKCS5 extends Model  {
	multipart = false
	static resource = 'pkcs5'

	constructor(args: Payload) {
		super(args)
		this.setUp()
	}

	get iv() { return this.properties.iv || this.fetchAsn1([0, 1, 1, 1]) }
	get values() { return this.properties }
	get iterations() { return this.properties.iterations || asn1.derToInteger(this.fetchAsn1([0, 1, 0, 1, 1])) }
	get cipher() { return this.properties.cipher || this.getCipher() }
	get digest() { return this.properties.digest || this.getDigest() }
	get salt() { return this.properties.salt || this.fetchAsn1([0, 1, 0, 1, 0]) }
	get cipherText() { return this.properties.cipherText || this.fetchAsn1([1]) }
	get asn1() { return this.properties.asn1 || this.buildAsn1() }

	static pbkdf2(args: {password: string, iterations: number, keySize: number, salt: string }): Buffer {
		try {
			const { password, salt, iterations, keySize } = args
			return pbkdf2Sync(new Buffer(password), Buffer.from(salt), iterations, keySize || 32, 'sha256')
		} catch(err) {
			throw 'Something went wrong in pbkdf2'
		}
	}

	static parse (der: string) {
		return new PKCS5({ asn1: asn1.fromDer(util.hexToBytes(der))});
	}

	setUp() {
		this.properties.iv = this.iv
		this.properties.iterations = this.iterations
		this.properties.cipherText = this.cipherText
		this.properties.salt = this.salt
		this.properties.cipher = this.cipher
		this.properties.digest = this.digest
		this.properties.asn1 = this.asn1
	}

	toDer() {
		return asn1.toDer(this.asn1);
	}

	toHex() {
		return util.bytesToHex(this.toDer());
	}

	fetchAsn1(arr: Array<any>) {
		let value = this.properties.asn1;
		if (!arr || !value)
			return undefined;
		arr.forEach((i) => value = value.value[i]);
		return value.value
	}

	buildAsn1() {
		return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
			asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
				asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        	asn1.oidToDer(pki.oids['pkcs5PBES2']).getBytes()),
      	asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      		asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      			asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        			asn1.oidToDer(pki.oids['pkcs5PBKDF2']).getBytes()),
      			asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      				asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, this.salt),
      				asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false, asn1.integerToDer(this.iterations).getBytes()),
      				asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
      					asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        					asn1.oidToDer(pki.oids[this.digest]).getBytes())
        			])
						])
					]),
					asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
						asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
        			asn1.oidToDer(pki.oids[this.cipher]).getBytes()),
      			asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, this.iv),
					])
				])
			]),
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, this.cipherText),
		])
	}

	private getDigest(): string {
		const digest = asn1.derToOid(this.fetchAsn1([0, 1, 0, 1, 2, 0]));
		return digest ? pki.oids[digest] : 'hmacWithSHA256'
	}

	private getCipher(): string {
		const cipher = asn1.derToOid(this.fetchAsn1([0, 1, 1, 0]));
		return cipher ? pki.oids[cipher] : 'aes256-CBC'
	}
}
