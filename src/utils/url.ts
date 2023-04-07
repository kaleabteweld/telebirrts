import { IStringA } from "../types";

export default class Url {

    public static combineUrl(baseUrl: string, endpoint: string) {
        const url = new URL(baseUrl);
        url.pathname = endpoint;
        return url.toString();
    }

    public static buildStringAURL(sortedSignFron: IStringA): string {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(sortedSignFron)) {
            params.append(key, value);
        }

        return params.toString();
    }
} 