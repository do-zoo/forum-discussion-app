import { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { BaseAPIResponse, Thread } from '@forum-discussion/types';

type AllThreadResponse = BaseAPIResponse<{
  threads: Thread[];
}>;

export interface ThreadServices {
  getAll(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<AllThreadResponse>>;
}
