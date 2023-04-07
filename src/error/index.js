"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeleBirrError = void 0;
class TeleBirrError extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    toJSON() {
        return {
            message: this.message,
            statusCode: this.code,
        };
    }
}
exports.TeleBirrError = TeleBirrError;
