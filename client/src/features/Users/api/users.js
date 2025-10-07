import axios from "axios"

const API = axios.create({ baseURL: 'http://localhost:8000/api/user' });

export const signUp = (data) => API.post(`/register`,data,{
    
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = (data) => API.post(`/login`,data,{
    
    headers: {
        'Content-Type': 'application/json',
    },
});

export const logout = () => API.get(`/logout`,{
    
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
});