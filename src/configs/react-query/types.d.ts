import { BaseAPIResponse } from '@forum-discussion/types';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type HttpErrorResponse = BaseAPIResponse<undefined>;

export type UseQueryResOptions<TData> = Omit<
  UseQueryOptions<TData, AxiosError<HttpErrorResponse>, TData, any>,
  'queryKey' | 'queryFn' | 'initialData'
> & {
  initialData?: (() => undefined) | undefined;
};

export type UseMutationResOptions<TData, TVariable = void> = Omit<
  UseMutationOptions<TData, AxiosError<HttpErrorResponse>, TVariable, unknown>,
  'mutationFn'
>;

export type UseQueryHooks<TParams, TData> = {
  params?: TParams;
  options?: UseQueryResOptions<TData>;
};

export type UseMutationHooks<TData, TVariable = void> = UseMutationResOptions<
  TData,
  TVariable
>;
