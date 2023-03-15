import { IResponse } from "../types";
import { TeleBirrError } from "../error";

export function checkIfSuccess(data: IResponse): IResponse | void {
    try {
        if (Number.parseInt(data.code) == 0 && data.message == "Success") return data
        else throw new TeleBirrError(data.message, data.code);
    } catch (error) {
        throw error;
    }

}