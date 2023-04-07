import Telebirr from ".";
import { IInAppStringA, IInAppResponse, InAppUssid, IRequestBody, ITransaction } from "../types";
import { Method } from "axios"
import Url from "../utils/url";


export default class InAppPayment extends Telebirr {
    protected endpoint: string = "/toTradeMobielPay";
    private requestMode: Method = "POST";
    private returnApp: string;

    private telebirr: Telebirr;

    // froms
    private transaction: ITransaction | undefined;
    private requestBody: IRequestBody | undefined;


    constructor(telebirr: Telebirr, returnApp: string) {
        super(telebirr.client, telebirr.requestReq, telebirr.receiver);
        this.returnApp = returnApp
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

    public async sendRequest(): Promise<IInAppResponse | void> {

        try {
            const inAppPaymentResponse: IInAppResponse = await this.telebirr.sendRequest({
                data: (this.requestBody as IRequestBody),
                endpoint: this.endpoint,
                requestMode: this.requestMode,
            }) as IInAppResponse;

            return inAppPaymentResponse;
        } catch (error) {
            throw error;
        }
    }

    private makeSigh(): string {

        const stringA: IInAppStringA = this.signBehavior.makeInAppPaymentStringASigh(this.returnApp,
            {
                appid: this.client.appid,
                appkey: this.client.appkey,
                receiver: this.receiver,
                requestReq: this.requestReq,
                transaction: (this.transaction as ITransaction)
            });

        return this.signBehavior.makeSigh<IInAppStringA>({ buildURL: Url.buildStringAURL }, stringA);
    }

    private makeUssid(): string {
        const ussid: InAppUssid = this.ussidBehavior.makeInAppPaymentUssid(this.returnApp,
            {
                appid: this.client.appid,
                appkey: this.client.appkey,
                receiver: this.receiver,
                requestReq: this.requestReq,
                transaction: (this.transaction as ITransaction)
            });
        return this.ussidBehavior.makeUssid<InAppUssid>({}, ussid);

    }


}