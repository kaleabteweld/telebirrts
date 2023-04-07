"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssidBehavior = exports.SighBehavior = void 0;
const index_1 = require("./index");
class SighBehavior {
    constructor() {
        this.encryptStringA = (queryString) => (0, index_1.encrypt)(queryString);
    }
    makeH5StringASigh(returnUrl, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnUrl, appid: appid, appkey: appkey, timestamp: new Date().getTime().toString() });
    }
    makeInAppPaymentStringASigh(returnApp, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnApp, appid: appid, appkey: appkey, timestamp: new Date().getTime().toString() });
    }
    makeSigh({ sort = this.sortStringA, buildURL, encrypt = this.encryptStringA }, stringA) {
        const sortStringA = sort(stringA);
        const queryString = buildURL(sortStringA);
        const encryptedQueryString = encrypt(JSON.stringify(queryString));
        return encryptedQueryString;
    }
    sortStringA(stringA) {
        let sortedSignFron = {};
        Object.keys(stringA).sort().forEach(key => {
            sortedSignFron[key] = stringA[key];
        });
        return sortedSignFron;
    }
}
exports.SighBehavior = SighBehavior;
class UssidBehavior {
    constructor() {
        this.encryptUssid = (ussid) => (0, index_1.encrypt)(ussid);
    }
    makeH5Ussid(returnUrl, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnUrl, appid: appid, appkey: appkey, timestamp: new Date().getTime().toString() });
    }
    makeInAppPaymentUssid(returnApp, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnApp, appid: appid, appkey: appkey, timestamp: new Date().getTime().toString() });
    }
    makeUssid({ encrypt = this.encryptUssid }, ussid) {
        const encryptedQueryString = encrypt(JSON.stringify(ussid));
        return encryptedQueryString;
    }
}
exports.UssidBehavior = UssidBehavior;
