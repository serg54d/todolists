import axios from "axios"

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY,
    },
})

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
	config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}`
    return config
})
