import { IRequestBody } from ".";
import { Method } from "axios"

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
}

export type TBaseSendRequest = {
    data: IRequestBody;
    endpoint: string;
    requestMode: Method
}

