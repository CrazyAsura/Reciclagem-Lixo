import api from '@/libs/api/axios/url';
import { RegisterSchema } from '@/libs/validation/zod/register';
import { loginSchema } from '@/libs/validation/zod/login';
import { API_URL } from '../api/axios/api-url';

export class AuthService {
    
    async register(data: RegisterSchema) {
        const payload = {
            name: data.name,
            cpf: data.cpf,
            birthDate: data.birthDate,
            gender: data.gender,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phones: [{ 
                ddi: data.ddi.replace('+', ''), 
                ddd: data.ddd, 
                number: data.phone 
            }],
            addresses: [{
                zipCode: data.zipCode,
                street: data.street,
                number: data.numberResidence,
                complement: data.complement,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
                country: data.country
            }]
        };

        const response = await api.post(API_URL.AUTH.REGISTER, payload);
        return response.data;
    }

    async login(data: loginSchema) {
        const response = await api.post(API_URL.AUTH.LOGIN, data);
        return response.data;
    }

    async getProfile(id: string) {
        const response = await api.get(`${API_URL.AUTH.PROFILE}/${id}`);
        return response.data;
    }

    async logout(data: { id: string; email: string; role: string; isActive: boolean }) {
        const response = await api.post(API_URL.AUTH.LOGOUT, data);
        return response.data;
    }
}

export const authService = new AuthService();
