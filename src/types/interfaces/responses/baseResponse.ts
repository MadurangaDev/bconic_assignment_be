export interface baseResponse<T> {
  body: T | null;
  message: string;
  error?: string;
}
