import { Iclient, IReceiver, IRequestReq, IResponse } from "./types";
import { TBaseSendRequest, TRequestReqInput, TTelebirrConstructor } from "./types/input";
import crypto from "crypto"
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { checkIfSuccess } from "./utils";


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

    public async sendRequest(arg: TBaseSendRequest): Promise<IResponse | void> {

        try {
            const options: AxiosRequestConfig = {
                baseURL: this.combineUrl(this.client.baseUrl, arg.endpoint),
                data: arg.data,
                method: arg.requestMode,
            }

            const response = await axios(options);
            const data: IResponse = checkIfSuccess(response.data) as IResponse;
            return data;

        } catch (error: any) {
            if (isAxiosError(error)) {
                throw Error(error.message)
            } else {
                throw error
            }

        }
    }

    private combineUrl(baseUrl: string, endpoint: string) {
        const url = new URL(baseUrl);
        url.pathname = endpoint;
        return url.toString();
    }
}

