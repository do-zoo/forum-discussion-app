export interface UserDetails {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
}
