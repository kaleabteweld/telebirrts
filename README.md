
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

To use the TeleBirr API, you first need to create an instance of the Telebirr class, which encapsulates the basic configuration of the API. You can then create an instance of the H5WebPayment class, which represents a payment made using the H5WebPayment method. Finally, you can call the sendRequest method on the H5WebPayment instance to initiate the payment request.

```typescript
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

In this example, we first create an instance of the Telebirr class, passing in the basic configuration options for the API. We then create an instance of the H5WebPayment class, passing in the Telebirr instance and the URL of the page to redirect the user to after the payment is completed.

We then add a transaction using the addTransaction method on the H5WebPayment instance. Finally, we call the sendRequest method on the H5WebPayment instance to initiate the payment request.


## Features

- H5WebPayment
- InAppPayment
- fully typed god bless typescript🤩❤️❤️


## Lessons Learned

Learned Design Patterns, this libraries mostly inspired/made up of strategy and decorator pattern
## Support

If you have any suggestions or find any issues with the API, please open an issue on the GitHub repository 😻


## Contributing
Contributions are welcome! 🤩✌️✌️