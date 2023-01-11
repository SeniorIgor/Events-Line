export type AppNotificationStatus = 'success' | 'error' | 'pending';

export interface AppNotification {
  title: string;
  message: string;
  status: AppNotificationStatus;
}
