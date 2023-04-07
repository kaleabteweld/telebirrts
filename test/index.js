"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const telebirr = index_1.Telebirr.fromOneValue({
    appid: "123456",
    appkey: "123456",
    publicKey: "123456",
    baseUrl: "https://api.telebirr.com",
    notifyUrl: "https://www.yourApp.com/notifyUrl",
    timeoutExpress: "123456",
    receiveName: "kolo",
    shortCode: "123456",
});
const webPayment = new index_1.H5WebPayment(telebirr, "/returnUrl");
webPayment.addTransaction({
    nonce: "123456",
    outTradeNo: "123456",
    subject: "Api",
    totalAmount: "100.0",
});
function pay() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield webPayment.sendRequest();
            console.log("res: ", res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
pay();
