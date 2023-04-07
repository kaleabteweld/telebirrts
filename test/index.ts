import { Telebirr, H5WebPayment } from "../src/index";

const telebirr: Telebirr = Telebirr.fromOneValue({
    appid: "123456",
    appkey: "123456",
    publicKey: "123456",
    baseUrl: "https://api.telebirr.com",
    notifyUrl: "https://www.yourApp.com/notifyUrl",
    timeoutExpress: "123456",
    receiveName: "kolo",
    shortCode: "123456",
});

const webPayment: H5WebPayment = new H5WebPayment(telebirr, "/returnUrl");
webPayment.addTransaction({
    nonce: "123456",
    outTradeNo: "123456",
    subject: "Api",
    totalAmount: "100.0",
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
