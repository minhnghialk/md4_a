import axios from "axios"

export default {
    register: async function(newUser: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "/api/v1/users", newUser)
    },
    login: async function(data: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "/api/v1/users/login", data)
    },
    authentication: async function() {
        return await axios.get(import.meta.env.VITE_SV_HOST + "auth")
    }
}