import type { Notification } from '../types';

let notifications: Notification[] = [];

export const notificationsApiService = {
	getAll: async (): Promise<Notification[]> => {
		return notifications;
	},

	create: async (notification: Notification): Promise<Notification> => {
		notifications = [notification, ...notifications];

		return notification;
	},

	deleteMany: async (notificationIds: string[]): Promise<void> => {
		const ids = new Set(notificationIds);
		notifications = notifications.filter((notification) => !ids.has(notification.id));
	},

	getById: async (notificationId: string): Promise<Notification> => {
		return notifications.find((notification) => notification.id === notificationId) as Notification;
	},

	delete: async (notificationId: string): Promise<void> => {
		notifications = notifications.filter((notification) => notification.id !== notificationId);
	}
};
