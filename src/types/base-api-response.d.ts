export interface BaseAPIResponse<T> {
  status: string;
  message: string;
  data: T;
}
