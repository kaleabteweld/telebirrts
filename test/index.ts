import Telebirr from "../src/paymentMethods";
import H5WebPayment from "../src/paymentMethods/H5WebPayment";

const telebirr: Telebirr = Telebirr.fromOneValue({
    appid: "123456",
    appkey: "123456",
    baseUrl: "https://jsonplaceholder.typicode.com/users",
    publicKey: "123456",
    notifyUrl: "https://www.baidu.com",
    timeoutExpress: "123456",
    receiveName: "123456",
    shortCode: "123456",
});

const webPayment: H5WebPayment = new H5WebPayment(telebirr, "/users");
webPayment.addTransaction({
    nonce: "123456",
    outTradeNo: "123456",
    subject: "123456",
    totalAmount: "123456",
})

async function pay() {
    try {
        const res = await webPayment.sendRequest();
        console.log("res: ", res);
    } catch (error) {
        console.log(error)
    }
}
pay();
