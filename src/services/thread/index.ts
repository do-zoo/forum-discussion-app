import { THREADS } from '@forum-discussion/utils/constants';
import { service } from '../base.service';
import { ThreadServices } from './thread';

export const threadService: ThreadServices = {
  async getAll() {
    return (await service.get(THREADS.getAll)).data;
  },
};
