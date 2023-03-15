export class TeleBirrError extends Error {
    constructor(public readonly message: string, public readonly code: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

    toJSON() {
        return {
            message: this.message,
            statusCode: this.code,
        };
    }
}