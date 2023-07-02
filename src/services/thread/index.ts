import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { service } from '../base.service';
import { ThreadServices } from './thread';

export const threadService: ThreadServices = {
  async getAll() {
    return service.get('/threads');
  },
};
