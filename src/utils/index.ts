import { IResponse } from "../types";
import { TeleBirrError } from "../error";
import crypto from "crypto"

export function checkIfSuccess(data: IResponse): IResponse | void {
    try {
        if (Number.parseInt(data.code) == 0 && data.message == "Success") return data
        else throw new TeleBirrError(data.message, data.code);
    } catch (error) {
        throw error;
    }

}

export function encrypt(string: string): string {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4000, // key length
    });
    try {
        // const publicKey = crypto.createPublicKey(this.client.publicKey);
        const encryptedData = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha512",
        }, Buffer.from(string)
        );
        return encryptedData.toString("base64");
    } catch (error: any) {
        console.log("[-] Encrypt Error", error.message.split("::")[1])
        return ""
    }

}