import axios, { AxiosResponse } from 'axios'

const sleep = (ms: number): Promise<unknown>  => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const makeJsonRequest = async (method: "GET" | "POST" | "DELETE" | "PUT", url: string, data: object): Promise<AxiosResponse> => {
    const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response
}

export {sleep, makeJsonRequest}
