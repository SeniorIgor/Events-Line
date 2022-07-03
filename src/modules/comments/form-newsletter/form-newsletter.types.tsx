export interface FormNewsletterState {
  email: string;
  message: string | null;
  error: string | null;
  isLoading?: boolean;
}
