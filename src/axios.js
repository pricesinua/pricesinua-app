import axios from 'axios'

axios.defaults.baseURL = "https://localhost:7297"

export const zakazua = axios.create({
    baseURL: "https://stores-api.zakaz.ua"
})