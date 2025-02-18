import axios from "axios"

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        "API-KEY": process.env.REACT_APP_API_KEY,
    },
})
