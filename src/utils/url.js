"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Url {
    static combineUrl(baseUrl, endpoint) {
        const url = new URL(baseUrl);
        url.pathname = endpoint;
        return url.toString();
    }
    static buildStringAURL(sortedSignFron) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(sortedSignFron)) {
            params.append(key, value);
        }
        return params.toString();
    }
}
exports.default = Url;
