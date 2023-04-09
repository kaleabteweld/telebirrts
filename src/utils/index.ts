import { IH5webResponse, IInAppResponse, IResponse } from "../types";
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

export function encrypt(string: string, publicKey: string): string {
    try {
        const _publicKey = crypto.createPublicKey(publicKey);
        const encryptedData = crypto.publicEncrypt({
            key: _publicKey,
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

export function isOfTypeH5webResponse(object: any): object is IH5webResponse {
    return "toPayUrl" in object && typeof object.data.toPayUrl === "string";
}

export function isOfTypeInAppResponse(object: any): object is IInAppResponse {
    return "toPayMsg" in object && typeof object.data.toPayMsg === "string";
}

// test functions
export function isSorted(arr: string[]): boolean {
    return arr.every((val, i, arr) => i === 0 || val >= arr[i - 1]);
}

export function areUrlParamsValid(url: URL) {
    const searchParams = new URLSearchParams(url.search);
    for (const value of searchParams.values()) {
        if (!value || value.trim().length === 0) {
            return false;
        }
    }
    return true;
}

export function decrypt(string: string, _privateKey: string, toString?: BufferEncoding): string {
    try {
        const privateKey = crypto.createPrivateKey(_privateKey);
        const decryptedData = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha512",
        }, Buffer.from(string, "base64")
        );
        return decryptedData.toString(toString);
    } catch (error: any) {
        console.log("[-] Decrypt Error", error)
        return ""
    }
}