import { UseMutationHooks } from '@forum-discussion/configs/react-query';
import { MemberAuthService, userService } from '@forum-discussion/services';
import { useMutation } from '@tanstack/react-query';

type Response = Awaited<ReturnType<MemberAuthService['register']>>['data'];

type Payload = {
  name: string;
  email: string;
  password: string;
};

export function useRegister(options?: UseMutationHooks<Response, Payload>) {
  return useMutation({
    mutationFn: async payload => (await userService.register(payload))?.data,
    ...options,
  });
}
