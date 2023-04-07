
# telebirrts

Typescript enforced teleBirr API package


## Installation

Install telebirrts with npm

```bash
  npm install telebirrts
```
    
Install telebirrts with yarn

```bash
  yarn add telebirrts
```
## Usage/Examples

```ts
import { Telebirr, H5WebPayment } from "telebirrts";

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

```


## Features

- H5WebPayment
- InAppPayment
- fully typed 😻 god bless typescript


## Lessons Learned

Learned Design Patterns, this libraries mostly inspired/made up of strategy and decorator pattern
## Support

For support, add an Github issues 😻

