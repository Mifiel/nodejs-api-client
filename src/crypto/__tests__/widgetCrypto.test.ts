import WidgetCrypto from '../widgetCrypto';
import * as fs from 'fs'
const widgetsFixture = JSON.parse(fs.readFileSync('test/fixtures/widgetIds.json', 'utf8'));

const master = WidgetCrypto.fromSeedHexToBip32(widgetsFixture.masterSeed).toBase58()
const keys = widgetsFixture.keys
describe('#Derive keys from widget', () => {
	widgetsFixture.ids.forEach((widgetId, idx) => {
		const { pub, priv, hardened } = keys[idx]
		it(`Should derive keyset ${priv} ${pub}`, () => {
			const docPath = 'test/fixtures/test-paged.pdf';
			const current = WidgetCrypto.deriveFromWidget({ key:master, widgetId, hardened })
			expect(current.privateKey.toString('hex')).toEqual(priv)
			expect(current.publicKey.toString('hex')).toEqual(pub)
		})
	})
})
describe('#Random master key', () => {
	it('Should generate random base58', () => {
		const key = WidgetCrypto.randomBip32()
		const key1 = WidgetCrypto.randomBip32()
		expect(key.toBase58() == key1.toBase58()).toBeFalsy()
	})
})

