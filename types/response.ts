export interface ApiResponse<T> {
  result: string;
  data: T;
  message?: string;
  errorCode?: string;
  success: boolean;
}

export interface Paged<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  page: number;
  hasNextPage: boolean;
}
