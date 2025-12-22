export interface ApiResponse<T> {
  result: string;
  data: T;
  message?: string;
  errorCode?: string;
}
