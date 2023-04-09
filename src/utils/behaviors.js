"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssidBehavior = exports.SighBehavior = void 0;
const index_1 = require("./index");
const url_1 = __importDefault(require("./url"));
class SighBehavior {
    constructor() {
        this.encryptStringA = (queryString, publicKey) => (0, index_1.encrypt)(queryString, publicKey);
        this.buildStringAURL = (stringA) => url_1.default.buildStringAURL(stringA);
        this.combineUrl = (baseUrl, endpoint) => url_1.default.combineUrl(baseUrl, endpoint);
    }
    makeH5StringASigh(returnUrl, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnUrl, appid: appid, appkey: appkey, timestamp: new Date().getTime().toString() });
    }
    makeInAppPaymentStringASigh(returnApp, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnApp, appid: appid, appkey: appkey, timestamp: new Date().getTime().toString() });
    }
    makeSigh({ sort = this.sortStringA, combineUrl = this.combineUrl, buildURL = this.buildStringAURL, encrypt = this.encryptStringA, publicKey, baseUrl }, stringA) {
        const sortStringA = sort(stringA);
        const queryString = combineUrl(baseUrl, buildURL(sortStringA));
        const encryptedQueryString = encrypt(JSON.stringify(queryString), publicKey);
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
        this.encryptUssid = (ussid, publicKey) => (0, index_1.encrypt)(ussid, publicKey);
    }
    makeH5Ussid(returnUrl, { appid, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnUrl, appid: appid, timestamp: new Date().getTime().toString() });
    }
    makeInAppPaymentUssid(returnApp, { appid, appkey, receiver, requestReq, transaction }) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receiver), requestReq), { returnApp, appid: appid, timestamp: new Date().getTime().toString() });
    }
    makeUssid({ encrypt = this.encryptUssid, publicKey }, ussid) {
        const encryptedQueryString = encrypt(JSON.stringify(ussid), publicKey);
        return encryptedQueryString;
    }
}
exports.UssidBehavior = UssidBehavior;
