import Telebirr from "..";
import { IH5StringA, IH5Ussid, IH5webResponse, IRequestBody, IStringA, ITransaction } from "../types";
import axios, { Method } from "axios"


export default class H5WebPayment extends Telebirr {
    protected endpoint: string = "/toTradeWebPay";
    private requestMode: Method = "POST";
    private returnUrl: string;

    private telebirr: Telebirr;

    // froms
    private transaction: ITransaction | undefined;
    private requestBody: IRequestBody | undefined;


    constructor(telebirr: Telebirr, returnUrl: string) {
        super(telebirr.client, telebirr.requestReq, telebirr.receiver);
        this.returnUrl = returnUrl
        this.telebirr = telebirr;
    }

    public addTransaction(transaction: ITransaction) {
        this.transaction = transaction;

        const encryptedUssid = this.makeUssid();
        const encryptedSigh = this.makeSigh();

        this.requestBody = {
            ussid: encryptedUssid,
            sign: encryptedSigh,
            appid: this.client.appid,
        }
    }

    public async sendRequest(): Promise<IH5webResponse | void> {

        try {
            const iH5webResponse: IH5webResponse = await this.telebirr.sendRequest({
                data: (this.requestBody as IRequestBody),
                endpoint: this.endpoint,
                requestMode: this.requestMode,
            }) as IH5webResponse;

            return iH5webResponse;
        } catch (error) {
            throw error;
        }
    }

    private makeSigh(): string {

        let stringA: IH5StringA = {
            ...this.transaction as ITransaction,
            ...this.receiver,
            ...this.requestReq,
            returnUrl: this.returnUrl,
            appid: this.client.appid,
            appkey: this.client.appkey,
        }

        let sortedSignFron: IStringA | any = {};

        // 1. sort by keys
        Object.keys(stringA).sort().forEach(key => {
            sortedSignFron[key as keyof IStringA] = stringA[key as keyof IStringA];
        });

        // 2. generate query string
        var queryString = this.buildURL(sortedSignFron);

        // 3. encryption
        const encryptedQueryString = this.encrypt(JSON.stringify(queryString));

        return encryptedQueryString;
    }

    private makeUssid(): string {
        let ussid: IH5Ussid = {
            ...this.transaction as ITransaction,
            ...this.receiver,
            ...this.requestReq,
            returnUrl: this.returnUrl,
            appid: this.client.appid,
        };
        const encryptedUssid = this.encrypt(JSON.stringify(ussid));
        return encryptedUssid;

    }

    private buildURL(sortedSignFron: IStringA): string {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(sortedSignFron)) {
            params.append(key, value);
        }

        return params.toString();
    }

}