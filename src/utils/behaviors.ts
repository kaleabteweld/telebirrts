import { IH5StringA, IH5Ussid, IInAppStringA, InAppUssid } from "../types";
import { encrypt } from "./index";
import { TMakeSighPerimeter, TMakeStringAPerimeter, TMakeUssidPerimeter } from "../types/input";
import Url from "./url";

export interface ISignBehavior {
    makeH5StringASigh: (returnUrl: string, Perimeter: TMakeStringAPerimeter) => IH5StringA,
    makeInAppPaymentStringASigh: (returnApp: string, Perimeter: TMakeStringAPerimeter) => IInAppStringA,
    makeSigh: <PaymentMethodd extends IInAppStringA | IH5StringA>(Perimeter: TMakeSighPerimeter, stringA: PaymentMethodd) => string,
    sortStringA: <PaymentMethodd>(stringA: PaymentMethodd) => PaymentMethodd
    encryptStringA: (queryString: string, publicKey: string) => string
    buildStringAURL: <PaymentMethodd extends IInAppStringA | IH5StringA>(stringA: PaymentMethodd) => string
    combineUrl: (baseUrl: string, endpoint: string) => string
}

export interface IUssidBehavior {
    makeH5Ussid: (returnUrl: string, Perimeter: TMakeStringAPerimeter) => IH5Ussid,
    makeInAppPaymentUssid: (returnApp: string, Perimeter: TMakeStringAPerimeter) => InAppUssid,
    makeUssid: <PaymentMethodd extends InAppUssid | IH5Ussid>(Perimeter: TMakeUssidPerimeter, ussid: PaymentMethodd) => string,
    encryptUssid: (ussid: string, publicKey: string) => string
}


export class SighBehavior implements ISignBehavior {

    public makeH5StringASigh(returnUrl: string, { appid, appkey, receiver, requestReq, transaction }: TMakeStringAPerimeter): IH5StringA {
        return {
            ...transaction,
            ...receiver,
            ...requestReq,
            returnUrl,
            appid: appid,
            appkey: appkey,
            timestamp: new Date().getTime().toString(),
        } as IH5StringA
    }

    public makeInAppPaymentStringASigh(returnApp: string, { appid, appkey, receiver, requestReq, transaction }: TMakeStringAPerimeter): IInAppStringA {
        return {
            ...transaction,
            ...receiver,
            ...requestReq,
            returnApp,
            appid: appid,
            appkey: appkey,
            timestamp: new Date().getTime().toString(),
        } as IInAppStringA
    }

    public makeSigh<PaymentMethodd extends IInAppStringA | IH5StringA>({ sort = this.sortStringA, combineUrl = this.combineUrl, buildURL = this.buildStringAURL, encrypt = this.encryptStringA, publicKey, baseUrl }: TMakeSighPerimeter, stringA: PaymentMethodd): string {
        const sortStringA = sort<PaymentMethodd>(stringA);
        const queryString = combineUrl(baseUrl, buildURL(sortStringA));
        const encryptedQueryString = encrypt(JSON.stringify(queryString), publicKey);
        return encryptedQueryString;
    }

    public sortStringA<PaymentMethodd>(stringA: PaymentMethodd): PaymentMethodd {
        let sortedSignFron: PaymentMethodd | any = {};

        Object.keys(stringA as any).sort().forEach(key => {
            sortedSignFron[key as keyof PaymentMethodd] = stringA[key as keyof PaymentMethodd];
        });

        return sortedSignFron;

    }

    public encryptStringA = (queryString: string, publicKey: string): string => encrypt(queryString, publicKey);

    public buildStringAURL = <PaymentMethodd extends IInAppStringA | IH5StringA>(stringA: PaymentMethodd) => Url.buildStringAURL(stringA)

    public combineUrl = (baseUrl: string, endpoint: string) => Url.combineUrl(baseUrl, endpoint)
}

export class UssidBehavior implements IUssidBehavior {

    public makeH5Ussid(returnUrl: string, { appid, receiver, requestReq, transaction }: TMakeStringAPerimeter): IH5Ussid {
        return {
            ...transaction,
            ...receiver,
            ...requestReq,
            returnUrl,
            appid: appid,
            timestamp: new Date().getTime().toString(),
        } as IH5Ussid
    }

    public makeInAppPaymentUssid(returnApp: string, { appid, appkey, receiver, requestReq, transaction }: TMakeStringAPerimeter): InAppUssid {
        return {
            ...transaction,
            ...receiver,
            ...requestReq,
            returnApp,
            appid: appid,
            timestamp: new Date().getTime().toString(),
        } as InAppUssid
    }

    public makeUssid<PaymentMethodd extends InAppUssid | IH5Ussid>({ encrypt = this.encryptUssid, publicKey }: TMakeUssidPerimeter, ussid: PaymentMethodd): string {
        const encryptedQueryString = encrypt(JSON.stringify(ussid), publicKey);
        return encryptedQueryString;
    }

    public encryptUssid = (ussid: string, publicKey: string): string => encrypt(ussid, publicKey);

}