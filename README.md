
# telebirrts Alpha Version

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

To use the TeleBirr API, you first need to create an instance of the Telebirr class, which encapsulates the basic configuration of the API. You can then create an instance of the H5WebPayment class, which represents a payment made using the H5WebPayment method. Finally, you can call the sendRequest method on the H5WebPayment instance to initiate the payment request.

```typescript
import { Telebirr, H5WebPayment, InAppPayment,IH5webResponse, checkIfSuccess, TeleBirrError, isOfTypeH5webResponse, isOfTypeInAppResponse,IAndroidReturnApp,IIOSReturnApp } from "telebirrts";
import crypto from "crypto"
import express, { Request, Response } from 'express';

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4000, // key length telebirrr is 2048
});

const telebirr: Telebirr = Telebirr.fromOneValue({
    appid: "123456",
    appkey: "123456",
    publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }).toString(),
    baseUrl: "https://api.telebirr.com",
    notifyUrl: "https://www.yourApp.com/notifyUrl",
    timeoutExpress: "123456",
    receiveName: "kolo",
    shortCode: "123456",
});

const webPayment: H5WebPayment = new H5WebPayment(telebirr, "/returnUrl");

const isoReturnApp: IIOSReturnApp = {
    Identifier: "willOpenTelebirrPay",
    Schemes: "com.ethio.telebirr"
}

const andoridReturnApp: IAndroidReturnApp = {
    Activity: "cn.tydic.ethiopay",
    PackageName: "cn.tydic.ethiopay.PayForOtherAppActivity"
}

const inappPayment: InAppPayment = new InAppPayment(telebirr, isoReturnApp); // or  new InAppPayment(telebirr, andoridReturnApp);

webPayment.addTransaction({
    nonce: "123456",
    outTradeNo: "123456",
    subject: "Api",
    totalAmount: "100.0",
})

inappPayment.addTransaction({
    nonce: "654321",
    outTradeNo: "654321",
    subject: "Api2",
    totalAmount: "1000.0",
})

async function pay() {
    try {
        // const res = await inappPayment.sendRequest(); OR
        const res = await webPayment.sendRequest();
        console.log("res: ", res);
    } catch (error) {
        console.log(error)
    }
}
pay();

const app = express();

app.post(telebirr.requestReq.notifyUrl, (req: Request, res: Response) => {
    const teleNotifyResponse: any = req.body;
    if (checkIfSuccess(teleNotifyResponse)) {

        if (isOfTypeH5webResponse(teleNotifyResponse)) {
            console.log("success toPayUrl: ", teleNotifyResponse.data.toPayUrl)
            res.json({ message: "success", toPayUrl: teleNotifyResponse.data.toPayUrl })
        }
        else if (isOfTypeInAppResponse(teleNotifyResponse)) {
            console.log("success toPayMsg: ", teleNotifyResponse.data.toPayMsg)
            res.json({ message: "success", toPayMsg: teleNotifyResponse.data.toPayMsg })
        } else {
            throw new TeleBirrError("Unknown object", "-1");
        }
    }

    else {
        throw new TeleBirrError(teleNotifyResponse.message, teleNotifyResponse.code);
    }

});

```

In this example, we first create an instance of the Telebirr class, passing in the basic configuration options for the API. We then create an instance of the H5WebPayment class, passing in the Telebirr instance and the URL of the page to redirect the user to after the payment is completed.

We then add a transaction using the addTransaction method on the H5WebPayment instance. Finally, we call the sendRequest method on the H5WebPayment instance to initiate the payment request.



## Features

- H5WebPayment
- InAppPayment
- fully typed god bless typescript🤩❤️❤️


## Lessons Learned

Learned Design Patterns, this libraries mostly inspired/made up of strategy and decorator pattern
## Support

As you may or may not noticed it's UNtested ie. didn't have access to credentials any issues would be appreciated
If you have any suggestions or find any issues with the API, please open an issue on the GitHub repository 😻


## Contributing
Contributions are welcome! 🤩✌️✌️