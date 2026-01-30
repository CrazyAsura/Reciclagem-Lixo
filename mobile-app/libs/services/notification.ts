import api from '@/libs/api/axios/url';
import { API_URL } from '../api/axios/api-url';

export class NotificationService {
    
    async getUserNotifications(userId: string) {
        const response = await api.get(`${API_URL.NOTIFICATIONS.USER}/${userId}`);
        return response.data;
    }

    async markAsRead(id: string) {
        const response = await api.patch(`${API_URL.NOTIFICATIONS.READ}/${id}/read`);
        return response.data;
    }

    async markAllAsRead(userId: string) {
        const response = await api.patch(`${API_URL.NOTIFICATIONS.USER}/${userId}/read-all`);
        return response.data;
    }
}

export const notificationService = new NotificationService();