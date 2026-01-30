import axios from "axios"

const BASE_URL = "http://localhost:3000/alerts"

export const fetchAlerts = async (filters = {}) =>{
    const res = await axios.get(BASE_URL, {
        params: filters
    })
    return res.data
}

export const createAlert = async (alertData) => {
    const res = await axios.post(BASE_URL,alertData)
    return res.data
}

export const updateAlertStatus = async (id,status) => {
    const res = await axios.put(`${BASE_URL}/${id}`,{status})
    return res.data
}

export const deleteAlert = async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data
}