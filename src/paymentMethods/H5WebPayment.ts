import Telebirr from ".";
import { IH5StringA, IH5Ussid, IH5webResponse, IRequestBody, IStringA, ITransaction } from "../types";
import { Method } from "axios"
import Url from "../utils/url";


export default class H5WebPayment extends Telebirr {
    protected endpoint: string = "/toTradeWebPay";
    private requestMode: Method = "POST";
    private returnUrl: string;

    private telebirr: Telebirr;

    // froms
    private transaction: ITransaction | undefined;
    private requestBody: IRequestBody | undefined;


    constructor(telebirr: Telebirr, returnUrl: string) {
        super(telebirr.client, telebirr.requestReq, telebirr.receiver, telebirr.signBehavior);
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

        const stringA: IH5StringA = this.signBehavior.makeH5StringASigh(this.returnUrl,
            {
                appid: this.client.appid,
                appkey: this.client.appkey,
                receiver: this.receiver,
                requestReq: this.requestReq,
                transaction: (this.transaction as ITransaction)
            });

        return this.signBehavior.makeSigh<IH5StringA>({ publicKey: this.client.publicKey, baseUrl: this.client.baseUrl }, stringA);
    };

    private makeUssid(): string {
        const ussid: IH5Ussid = this.ussidBehavior.makeH5Ussid(this.returnUrl,
            {
                appid: this.client.appid,
                appkey: this.client.appkey,
                receiver: this.receiver,
                requestReq: this.requestReq,
                transaction: (this.transaction as ITransaction)
            });
        return this.ussidBehavior.makeUssid<IH5Ussid>({ publicKey: this.client.publicKey }, ussid);

    }

}