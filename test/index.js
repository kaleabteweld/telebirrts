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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentMethods_1 = __importDefault(require("../src/paymentMethods"));
const H5WebPayment_1 = __importDefault(require("../src/paymentMethods/H5WebPayment"));
const telebirr = paymentMethods_1.default.fromOneValue({
    appid: "123456",
    appkey: "123456",
    baseUrl: "https://jsonplaceholder.typicode.com/users",
    publicKey: "123456",
    notifyUrl: "https://www.baidu.com",
    timeoutExpress: "123456",
    receiveName: "123456",
    shortCode: "123456",
});
const webPayment = new H5WebPayment_1.default(telebirr, "/users");
webPayment.addTransaction({
    nonce: "123456",
    outTradeNo: "123456",
    subject: "123456",
    totalAmount: "123456",
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
