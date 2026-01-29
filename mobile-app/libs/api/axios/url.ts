import axios from 'axios';
import { store } from '@/libs/redux-toolkit/redux-persist/store';

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;