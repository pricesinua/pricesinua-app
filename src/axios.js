import axios from 'axios'

export const priceobserver = axios.create({
    baseURL: "https://localhost:7297"
})

export const zakazua = axios.create({
    baseURL: "https://stores-api.zakaz.ua"
})