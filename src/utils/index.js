"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.areUrlParamsValid = exports.isSorted = exports.isOfTypeInAppResponse = exports.isOfTypeH5webResponse = exports.encrypt = exports.checkIfSuccess = void 0;
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
function encrypt(string, publicKey) {
    try {
        const _publicKey = crypto_1.default.createPublicKey(publicKey);
        const encryptedData = crypto_1.default.publicEncrypt({
            key: _publicKey,
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
function isOfTypeH5webResponse(object) {
    return "toPayUrl" in object && typeof object.data.toPayUrl === "string";
}
exports.isOfTypeH5webResponse = isOfTypeH5webResponse;
function isOfTypeInAppResponse(object) {
    return "toPayMsg" in object && typeof object.data.toPayMsg === "string";
}
exports.isOfTypeInAppResponse = isOfTypeInAppResponse;
// test functions
function isSorted(arr) {
    return arr.every((val, i, arr) => i === 0 || val >= arr[i - 1]);
}
exports.isSorted = isSorted;
function areUrlParamsValid(url) {
    const searchParams = new URLSearchParams(url.search);
    for (const value of searchParams.values()) {
        if (!value || value.trim().length === 0) {
            return false;
        }
    }
    return true;
}
exports.areUrlParamsValid = areUrlParamsValid;
function decrypt(string, _privateKey, toString) {
    try {
        const privateKey = crypto_1.default.createPrivateKey(_privateKey);
        const decryptedData = crypto_1.default.privateDecrypt({
            key: privateKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha512",
        }, Buffer.from(string, "base64"));
        return decryptedData.toString(toString);
    }
    catch (error) {
        console.log("[-] Decrypt Error", error);
        return "";
    }
}
exports.decrypt = decrypt;
