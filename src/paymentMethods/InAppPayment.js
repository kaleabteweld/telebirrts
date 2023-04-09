"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
class InAppPayment extends _1.default {
    constructor(telebirr, returnApp) {
        super(telebirr.client, telebirr.requestReq, telebirr.receiver);
        this.endpoint = "/toTradeMobielPay";
        this.requestMode = "POST";
        this.returnApp = returnApp;
        this.telebirr = telebirr;
    }
    addTransaction(transaction) {
        this.transaction = transaction;
        const encryptedUssid = this.makeUssid();
        const encryptedSigh = this.makeSigh();
        this.requestBody = {
            ussid: encryptedUssid,
            sign: encryptedSigh,
            appid: this.client.appid,
        };
    }
    sendRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inAppPaymentResponse = yield this.telebirr.sendRequest({
                    data: this.requestBody,
                    endpoint: this.endpoint,
                    requestMode: this.requestMode,
                });
                return inAppPaymentResponse;
            }
            catch (error) {
                throw error;
            }
        });
    }
    makeSigh() {
        const stringA = this.signBehavior.makeInAppPaymentStringASigh(this.returnApp, {
            appid: this.client.appid,
            appkey: this.client.appkey,
            receiver: this.receiver,
            requestReq: this.requestReq,
            transaction: this.transaction
        });
        return this.signBehavior.makeSigh({ publicKey: this.client.publicKey, baseUrl: this.client.baseUrl }, stringA);
    }
    makeUssid() {
        const ussid = this.ussidBehavior.makeInAppPaymentUssid(this.returnApp, {
            appid: this.client.appid,
            appkey: this.client.appkey,
            receiver: this.receiver,
            requestReq: this.requestReq,
            transaction: this.transaction
        });
        return this.ussidBehavior.makeUssid({ publicKey: this.client.publicKey }, ussid);
    }
}
exports.default = InAppPayment;
