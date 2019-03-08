import { random } from 'node-forge'
import * as BIP32  from 'bip32'


export default class WidgetCrypto {
	static randomBip32() {
		return BIP32.fromSeed(Buffer.from(random.getBytesSync(16)))
	}

	static fromSeedHexToBip32(seed:string) {
		return BIP32.fromSeed(Buffer.from(seed, 'hex'))
	}

	static derivePath(key: string, path:string) {
		const node = BIP32.fromBase58(key)
		return node.derivePath(path)
	}

	static deriveFromWidget(args: { key:string , widgetId:string, hardened:boolean }) {
		const {key, widgetId, hardened} = args
		const path = widgetId.split('-')
		if (path.length != 7)
			throw 'Wrong widget_id'
		if (hardened)
			path[5] += "'"
		return this.derivePath(key, path.slice(5, 7).join('/'))
	}
}
