import { THREADS } from '@forum-discussion/utils/constants';
import { service } from '../base.service';
import { ThreadServices } from './thread';

export const threadService: ThreadServices = {
  async getAll() {
    const res = await service.get(THREADS.getAll);
    console.log(res);

    return res;
  },
};
