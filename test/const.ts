import { IReceiver, IRequestReq, ITransaction, Iclient, SighBehavior, UssidBehavior } from "../";
import crypto from "crypto"


export const sighBehavior: SighBehavior = new SighBehavior();
export const ussidBehavior: UssidBehavior = new UssidBehavior();

export const client: Iclient = {
    appid: "123456",
    appkey: "123456",
    publicKey: "123456",
    baseUrl: "https://api.telebirr.com",
}

export const receiver: IReceiver = {
    receiveName: "kolo",
    shortCode: "123456",
}

export const requestReq: IRequestReq = {
    notifyUrl: "https://www.yourApp.com/notifyUrl",
    timeoutExpress: "123456",
}

export const transaction: ITransaction = {
    nonce: "123456",
    outTradeNo: "123456",
    subject: "Api",
    totalAmount: "100.0",
}


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4000, // key length
});
export const _publicKey = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString();
export const _privateKey = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString();