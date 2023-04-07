import { Iclient, IReceiver, IRequestReq, IResponse, ITransaction } from "../types";
import { TBaseSendRequest, TRequestReqInput, TTelebirrConstructor } from "../types/input";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { checkIfSuccess } from "../utils";
import { SighBehavior, ISignBehavior, IUssidBehavior, UssidBehavior } from "../utils/behaviors";
import Url from "../utils/url";


export default class Telebirr {
    public client: Iclient;
    public requestReq: IRequestReq;
    public receiver: IReceiver;

    //behaviors
    public signBehavior: ISignBehavior;
    public ussidBehavior: IUssidBehavior;


    constructor(client: Iclient, requestReq: TRequestReqInput, receiver: IReceiver, _signBehavior?: ISignBehavior, _ussidBehavior?: IUssidBehavior) {
        this.client = client;
        this.requestReq = requestReq;
        this.receiver = receiver;
        this.signBehavior = _signBehavior ?? new SighBehavior()
        this.ussidBehavior = _ussidBehavior ?? new UssidBehavior()
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
        }, arg.signBehavior,
            arg.ussidBehavior

        )

    }

    public async sendRequest(arg: TBaseSendRequest): Promise<IResponse | void> {

        try {
            const options: AxiosRequestConfig = {
                baseURL: Url.combineUrl(this.client.baseUrl, arg.endpoint),
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

}
