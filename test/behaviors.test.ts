import { IH5StringA, IH5Ussid, IInAppStringA, InAppUssid, areUrlParamsValid, decrypt, isSorted } from "../src";
import { _privateKey, _publicKey, client, receiver, requestReq, sighBehavior, transaction, ussidBehavior } from "./const";
import Url from "../src/utils/url";



describe('behaviors', () => {


    describe('SighBehavior', () => {

        it('SighBehavior.makeH5StringASigh should make a H5StringA sigh', () => {
            const h5StringA: IH5StringA = sighBehavior.makeH5StringASigh('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            expect(h5StringA).toEqual<IH5StringA>({
                appid: client.appid,
                appkey: client.appkey,
                ...transaction,
                ...receiver,
                ...requestReq,
                timestamp: expect.any(String),
                returnUrl: 'returnUrl',
            });
        });

        it('SighBehavior.makeInAppPaymentStringASigh should make a IInAppStringA sigh', () => {
            const inAppStringA: IInAppStringA = sighBehavior.makeInAppPaymentStringASigh('returnApp', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            expect(inAppStringA).toEqual<IInAppStringA>({
                appid: client.appid,
                appkey: client.appkey,
                ...transaction,
                ...receiver,
                ...requestReq,
                timestamp: expect.any(String),
                returnApp: 'returnApp',
            });
        });

        it('SighBehavior.sortStringA should sort all keys in sigh', () => {
            const inAppStringA: IInAppStringA = sighBehavior.makeInAppPaymentStringASigh('returnApp', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const sortInAppStringA: IInAppStringA = sighBehavior.sortStringA(inAppStringA);
            const keys = Object.keys(sortInAppStringA);

            expect(isSorted(keys)).toEqual(true);
        });

        it('SighBehavior.buildStringAURL should make IH5StringA url', () => {
            const h5StringA: IH5StringA = sighBehavior.makeH5StringASigh('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const sortH5StringA: IH5StringA = sighBehavior.sortStringA(h5StringA);

            const h5StringAUrl: URL = new URL(Url.combineUrl(client.baseUrl, sighBehavior.buildStringAURL<IH5StringA>(sortH5StringA)));

            expect(areUrlParamsValid(h5StringAUrl)).toEqual(true);

        });

        it('SighBehavior.buildStringAURL should make IInAppStringA url', () => {
            const inAppStringA: IInAppStringA = sighBehavior.makeInAppPaymentStringASigh('returnApp', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const sortInAppStringA: IInAppStringA = sighBehavior.sortStringA(inAppStringA);

            const inAppStringAUrl: URL = new URL(Url.combineUrl(client.baseUrl, sighBehavior.buildStringAURL<IInAppStringA>(sortInAppStringA)));

            expect(areUrlParamsValid(inAppStringAUrl)).toEqual(true);

        });

        it('SighBehavior.encryptStringA should make an encrypted url string', () => {
            const h5StringA: IH5StringA = sighBehavior.makeH5StringASigh('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const sortH5StringA: IH5StringA = sighBehavior.sortStringA(h5StringA);

            const h5StringAUrl: URL = new URL(Url.combineUrl(client.baseUrl, sighBehavior.buildStringAURL<IH5StringA>(sortH5StringA)));

            const encryptedH5Url = sighBehavior.encryptStringA(h5StringAUrl.toString(), _publicKey);

            expect(decrypt(encryptedH5Url, _privateKey).toString()).toEqual(h5StringAUrl.toString());

        });

        it('SighBehavior.makeSigh<H5StringA> should make a Complete H5StringA string', () => {
            const h5tringA: IH5StringA = sighBehavior.makeH5StringASigh('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const sortH5StringA: IH5StringA = sighBehavior.sortStringA(h5tringA);
            const h5StringAUrl: URL = new URL(Url.combineUrl(client.baseUrl, sighBehavior.buildStringAURL<IH5StringA>(sortH5StringA)));

            const sigh: string = sighBehavior.makeSigh<IH5StringA>({ publicKey: _publicKey, baseUrl: client.baseUrl }, h5tringA);

            expect(decrypt(sigh, _privateKey).toString().replace("\"", "").replace("\"", "")).toEqual(h5StringAUrl.toString());
        });
    });

    describe('UssidBehavior', () => {

        it('UssidBehavior.makeH5Ussid should make a IH5Ussid sigh', () => {
            const h5ussid: IH5Ussid = ussidBehavior.makeH5Ussid('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            expect(h5ussid).toEqual<IH5Ussid>({
                appid: client.appid,
                ...transaction,
                ...receiver,
                ...requestReq,
                timestamp: expect.any(String),
                returnUrl: 'returnUrl',
            });
        });

        it('UssidBehavior.makeInAppPaymentUssid should make a InAppUssid sigh', () => {
            const inAppStringA: InAppUssid = ussidBehavior.makeInAppPaymentUssid('returnApp', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            expect(inAppStringA).toEqual<InAppUssid>({
                appid: client.appid,
                ...transaction,
                ...receiver,
                ...requestReq,
                timestamp: expect.any(String),
                returnApp: 'returnApp',
            });
        });

        it('UssidBehavior.encryptStringA should make an encrypted url string', () => {
            const h5ussid: IH5Ussid = ussidBehavior.makeH5Ussid('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const encryptedH5ussid: string = ussidBehavior.encryptUssid(JSON.stringify(h5ussid), _publicKey);

            expect(decrypt(encryptedH5ussid, _privateKey).toString()).toEqual(JSON.stringify(h5ussid));

        });

        it('SighBehavior.makeSigh<H5StringA> should make a Complete H5StringA string', () => {
            const h5ussid: IH5Ussid = ussidBehavior.makeH5Ussid('returnUrl', {
                appid: client.appid,
                appkey: client.appkey,
                receiver, requestReq,
                transaction
            });

            const sigh: string = ussidBehavior.makeUssid<IH5Ussid>({ publicKey: _publicKey }, h5ussid);

            expect(decrypt(sigh, _privateKey).toString()).toEqual(JSON.stringify(h5ussid));
        });
    });

})





