import {
  LoginPayload,
  RegisterPayload,
  UserDetails,
} from '@forum-discussion/types/user';
import axios, { type AxiosRequestConfig } from 'axios';
import { publicService } from '../base.service';
import { MEMBER_AUTH } from '@forum-discussion/utils/constants';
import { BaseAPIResponse } from '@forum-discussion/types';

export interface MemberAuthService {
  register: (
    payload: RegisterPayload,
    config?: AxiosRequestConfig
  ) => Promise<
    BaseAPIResponse<{
      user: UserDetails;
    }>
  >;
  login: (
    payload: LoginPayload,
    config?: AxiosRequestConfig
  ) => Promise<
    BaseAPIResponse<{
      token: string;
    }>
  >;
}

export const userService: MemberAuthService = {
  async register(payload) {
    return publicService
      .post(MEMBER_AUTH.register, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.data)
      .catch(err => {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data);
        }
      });
  },
  async login(payload) {
    return publicService
      .post(MEMBER_AUTH.login, payload)
      .then(res => res.data)
      .catch(err => {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data);
        }
      });
  },
};
