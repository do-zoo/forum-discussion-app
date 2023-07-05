export const THREADS = {
  getAll: '/threads',
};

export const MEMBER_AUTH = {
  register: '/register',
  login: '/login',
};

export const sameOriginPaths = {
  refreshToken: '/api/auth/session?refresh_token',
  update: '/api/auth/session?update',
} as const;
