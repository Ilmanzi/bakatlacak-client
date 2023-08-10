import axios from "axios"
// const baseURL = "http://localhost:7000/api"
const baseURL = "https://bakatlacak-server.up.railway.app/api"


const instance = axios.create({
    baseURL: baseURL
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance