import { Iclient, IReceiver, IRequestReq } from "./types";
import { TRequestReqInput, TTelebirrConstructor } from "./types/input";
import crypto from "crypto"

export default class Telebirr {
    public client: Iclient;
    public requestReq: IRequestReq;
    public receiver: IReceiver;

    constructor(client: Iclient, requestReq: TRequestReqInput, receiver: IReceiver) {
        this.client = client;
        this.requestReq = { ...requestReq, timestamp: Date.now().toString() };
        this.receiver = receiver;
    }
    public static fromOneValue(arg: TTelebirrConstructor): Telebirr {
        return new Telebirr({
            appid: arg.appid,
            appkey: arg.appkey,
            baseUrl: arg.baseUrl,
            publicKey: arg.publicKey,
        }, {
            notifyUrl: arg.notifyUrl,
            timeoutExpress: arg.timeoutExpress,
        }, {
            receiveName: arg.receiveName,
            shortCode: arg.shortCode,
        })

    }

    protected encrypt(data: string): string {

        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4000, // key length
        });
        try {
            // const publicKey = crypto.createPublicKey(this.client.publicKey);
            const encryptedData = crypto.publicEncrypt({
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha512",
            }, Buffer.from(data)
            );
            return encryptedData.toString("base64");
        } catch (error: any) {
            console.log("[-] Encrypt Error", error.message.split("::")[1])
            return ""
        }
    }

}

