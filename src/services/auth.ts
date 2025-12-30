import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<string> => {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/auth/login`,
    credentials
  );
  return response.data.token;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};
