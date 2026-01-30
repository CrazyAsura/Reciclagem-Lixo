export interface Notification {
    id: string;
    title: string;
    description: string;
    read: boolean;
    createdAt: string;
    userId: string;
    icon?: string;
}