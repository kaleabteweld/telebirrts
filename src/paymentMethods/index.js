"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importStar(require("axios"));
const utils_1 = require("../utils");
const behaviors_1 = require("../utils/behaviors");
const url_1 = __importDefault(require("../utils/url"));
class Telebirr {
    constructor(client, requestReq, receiver, _signBehavior, _ussidBehavior) {
        this.client = client;
        this.requestReq = requestReq;
        this.receiver = receiver;
        this.signBehavior = _signBehavior !== null && _signBehavior !== void 0 ? _signBehavior : new behaviors_1.SighBehavior();
        this.ussidBehavior = _ussidBehavior !== null && _ussidBehavior !== void 0 ? _ussidBehavior : new behaviors_1.UssidBehavior();
    }
    static fromOneValue(arg) {
        return new Telebirr({
            appid: arg.appid,
            appkey: arg.appkey,
            baseUrl: arg.baseUrl,
            publicKey: arg.publicKey,
        }, {
            notifyUrl: arg.notifyUrl,
            timeoutExpress: arg.timeoutExpress,
        }, {
            receiveName: arg.receiveName,
            shortCode: arg.shortCode,
        }, arg.signBehavior, arg.ussidBehavior);
    }
    sendRequest(arg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    baseURL: url_1.default.combineUrl(this.client.baseUrl, arg.endpoint),
                    data: arg.data,
                    method: arg.requestMode,
                };
                const response = yield (0, axios_1.default)(options);
                const data = (0, utils_1.checkIfSuccess)(response.data);
                return data;
            }
            catch (error) {
                if ((0, axios_1.isAxiosError)(error)) {
                    throw Error(error.message);
                }
                else {
                    throw error;
                }
            }
        });
    }
}
exports.default = Telebirr;
