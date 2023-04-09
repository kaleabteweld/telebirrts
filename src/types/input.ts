import { IH5StringA, IInAppStringA, IReceiver, IRequestBody, IRequestReq, IStringA, ITransaction } from ".";
import { Method } from "axios"
import { ISignBehavior, IUssidBehavior } from "../utils/behaviors";

/**
 * @param notifyUrl Indicates the end point URL from third party which will be used by telebirr platform to respond the Payment result
 * @param timeoutExpress Indicates the payment Order request timeout from third party which indicates the time for payment process to be ended. After this time the payment will not be processed and third party system can reinitiate again,the parameter value unit is Minutes
 */
export type TRequestReqInput = {
    notifyUrl: string;
    timeoutExpress: string;
}

/**
* @param appid Indicates the appID provided from telebirr
* @param appkey Indicates the appKey provided by telebirr platform
* @param baseUrl Indicates the base url of the telebirr platform
* @param publicKey Indicates the publicKey provided from telebirr
* @param notifyUrl Indicates the end point URL from third party which will be used by telebirr platform to respond the Payment result
* @param timeoutExpress Indicates the payment Order request timeout from third party which indicates the time for payment process to be ended. After this time the payment will not be processed and third party system can reinitiate again,the parameter value unit is Minutes
* @param receiveName Indicates the name of the person/organization who will receive the payment
* @param shortCode Indicates third party  Short Code provided from telebirr
**/
export type TTelebirrConstructor = {
    appid: string;
    appkey: string;
    publicKey: string;
    baseUrl: string;
    notifyUrl: string;
    timeoutExpress: string;
    receiveName: string;
    shortCode: string;
    signBehavior?: ISignBehavior
    ussidBehavior?: IUssidBehavior
}

export type TBaseSendRequest = {
    data: IRequestBody;
    endpoint: string;
    requestMode: Method
}

/**
* @param sort <PaymentMethodd> takes in either IInAppStringA or IH5StringA sorts it by key
* @param buildURL returns the url of IStringA Object
* @param encrypt Return the encrypted string of the url
**/

export type TMakeSighPerimeter = {
    sort?: <PaymentMethodd extends IInAppStringA | IH5StringA> (stringA: PaymentMethodd) => PaymentMethodd
    buildURL?: <PaymentMethodd extends IInAppStringA | IH5StringA>(stringA: PaymentMethodd) => string
    encrypt?: (queryString: string) => string
}

/**
* @param encrypt Return the encrypted string of the url
**/
export type TMakeUssidPerimeter = {
    encrypt?: (queryString: string) => string
}

/**
* @param transaction transaction Object
* @param receiver receiver Object
* @param requestReq requestReq Object
* @param appkey Indicates the appKey provided by telebirr platform
* @param appid Indicates the appId provided by telebirr platform

**/
export type TMakeStringAPerimeter = {
    transaction: ITransaction,
    receiver: IReceiver,
    requestReq: IRequestReq,
    appid: string,
    appkey: string,
}