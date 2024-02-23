import api from '@/utils/api';

const defaultPath = `/api/v1`;
const authPath = '/auth';

export const AUTH_ACTIONS = {
  login: (email: string, password: string) =>
    api.post(`${defaultPath}${authPath}/login`, { email, password }),

  me: () => api.get(`${defaultPath}${authPath}/me`),
};
