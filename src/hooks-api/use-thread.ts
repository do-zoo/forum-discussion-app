import { UseQueryHooks } from '@forum-discussion/configs/react-query';
import { ThreadServices, threadService } from '@forum-discussion/services';
import { THREADS } from '@forum-discussion/utils/constants';
import { useQuery } from '@tanstack/react-query';

type Response = Awaited<
  ReturnType<ThreadServices['getAll']>
>['data']['threads'];

export function useThreads({ options }: UseQueryHooks<unknown, Response>) {
  return useQuery({
    queryKey: [THREADS.getAll],
    queryFn: async () => threadService.getAll().then(res => res.data?.threads),
    ...options,
  });
}
