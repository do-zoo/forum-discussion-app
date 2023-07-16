'use client';
import { sameOriginPaths } from '@forum-discussion/utils/constants';
import { getSession } from '@forum-discussion/utils/helpers/auth/client';
import {
  Axios,
  AxiosError,
  AxiosInstance,
  CustomParamsSerializer,
} from 'axios';
import { JWT } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import { stringify } from 'qs';

interface IHttpClient {
  get: (...args: Parameters<Axios['get']>) => ReturnType<Axios['get']>;
  post: (...args: Parameters<Axios['post']>) => ReturnType<Axios['post']>;
  put: (...args: Parameters<Axios['put']>) => ReturnType<Axios['put']>;
  patch: (...args: Parameters<Axios['patch']>) => ReturnType<Axios['patch']>;
  delete: (...args: Parameters<Axios['delete']>) => ReturnType<Axios['delete']>;
  options: (
    ...args: Parameters<Axios['options']>
  ) => ReturnType<Axios['options']>;
}

class HttpClient implements IHttpClient {
  private isRefreshingAccessToken: boolean;
  private session: JWT | null;

  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.isRefreshingAccessToken = false;
    this.session = null;

    this.axiosInstance.interceptors.request.use(
      async config => {
        if (this.session === null) {
          this.session = await getSession();
        }

        config.headers.Accept = 'application/json';

        if (this.session?.token) {
          config.headers.Authorization = `Bearer ${this.session.token}`;
        }

        return config;
      },
      async error => {
        Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      async response => {
        return response;
      },
      async error => {
        const { response } = error as AxiosError<any>;

        if (
          response?.status === 401 ||
          response?.data?.message === 'Unauthenticated' ||
          response?.data?.meta?.code === 401 ||
          response?.data?.meta?.message === 'Unauthenticated.'
        ) {
          if (this.isRefreshingAccessToken) return;

          this.isRefreshingAccessToken = true;

          try {
            await this.axiosInstance.get(sameOriginPaths.refreshToken, {
              baseURL: '/',
            });

            this.session = await getSession();

            if (this.session?.error) {
              await signOut({ redirect: false }); // redirect already handled by protected guard

              throw new Error(this.session?.error);
            }
          } catch (err) {
            return Promise.reject(err);
          } finally {
            this.isRefreshingAccessToken = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public get(...args: Parameters<Axios['get']>) {
    const [url, config] = args;

    return this.axiosInstance.get(url, {
      paramsSerializer: {
        serialize: stringify as CustomParamsSerializer,
      },
      ...config,
    });
  }

  public post(...args: Parameters<Axios['post']>) {
    const [url, payload, config] = args;

    return this.axiosInstance.post(url, payload, {
      paramsSerializer: {
        serialize: stringify as CustomParamsSerializer,
      },
      ...config,
    });
  }

  public put(...args: Parameters<Axios['put']>) {
    const [url, payload, config] = args;

    return this.axiosInstance.put(url, payload, {
      paramsSerializer: {
        serialize: stringify as CustomParamsSerializer,
      },
      ...config,
    });
  }

  public patch(...args: Parameters<Axios['patch']>) {
    const [url, payload, config] = args;

    return this.axiosInstance.patch(url, payload, {
      paramsSerializer: {
        serialize: stringify as CustomParamsSerializer,
      },
      ...config,
    });
  }

  public delete(...args: Parameters<Axios['delete']>) {
    const [url, config] = args;

    return this.axiosInstance.delete(url, {
      paramsSerializer: {
        serialize: stringify as CustomParamsSerializer,
      },
      ...config,
    });
  }

  public options(...args: Parameters<Axios['options']>) {
    const [url, config] = args;

    return this.axiosInstance.options(url, {
      paramsSerializer: {
        serialize: stringify as CustomParamsSerializer,
      },
      ...config,
    });
  }
}

export default HttpClient;
