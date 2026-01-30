import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/libs/services/notification";

export const useNotificationsQuery = (userId?: string) => {
    return useQuery({
        queryKey: ['notifications', userId],
        queryFn: () => notificationService.getUserNotifications(userId!),
        enabled: !!userId,
        refetchInterval: 30000,
    });
}

export const useMarkNotificationReadMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => notificationService.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });
}

export const useMarkAllNotificationsReadMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => notificationService.markAllAsRead(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });
}