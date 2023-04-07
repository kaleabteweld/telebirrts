"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.checkIfSuccess = void 0;
const error_1 = require("../error");
const crypto_1 = __importDefault(require("crypto"));
function checkIfSuccess(data) {
    try {
        if (Number.parseInt(data.code) == 0 && data.message == "Success")
            return data;
        else
            throw new error_1.TeleBirrError(data.message, data.code);
    }
    catch (error) {
        throw error;
    }
}
exports.checkIfSuccess = checkIfSuccess;
function encrypt(string) {
    const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 4000, // key length
    });
    try {
        // const publicKey = crypto.createPublicKey(this.client.publicKey);
        const encryptedData = crypto_1.default.publicEncrypt({
            key: publicKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha512",
        }, Buffer.from(string));
        return encryptedData.toString("base64");
    }
    catch (error) {
        console.log("[-] Encrypt Error", error.message.split("::")[1]);
        return "";
    }
}
exports.encrypt = encrypt;
