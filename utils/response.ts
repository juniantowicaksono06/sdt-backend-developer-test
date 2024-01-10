import { Response } from "express-serve-static-core";

const returnSuccess = (responseStatus: number = 200, res: Response, responseMessage: string = "Success", data: object | null = null) => {
    let result;
    if(data) {
        result = {
            message: responseMessage,
            data: data
        };
    } else {
        result = {
            message: responseMessage
        };
    }

    return res.status(responseStatus).send(result);
}

export { returnSuccess }