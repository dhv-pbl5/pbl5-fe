import User from '@/models/User';
import { AUTH_ACTIONS } from '@/services/auth';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AuthState = {
  profile: User | null;
  authenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  me: () => Promise<void>;
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        profile: null,
        authenticated: localStorage.getItem('access_token') !== null,

        login: async (email: string, password: string) => {
          const response = await AUTH_ACTIONS.login(email, password);
          if (response.status === 200 && response.data.success) {
            localStorage.setItem(
              'access_token',
              response.data.raw.ACCESS_TOKEN,
            );
            set((state) => ({
              ...state,
              authenticated: true,
            }));
          }
        },

        logout: () => {
          localStorage.removeItem('access_token');
          set((state) => ({
            ...state,
            profile: null,
            authenticated: false,
          }));
        },

        me: async () => {
          const response = await AUTH_ACTIONS.me();
          if (response.status === 200 && response.data.success) {
            set((state) => ({
              ...state,
              profile: response.data.raw,
            }));
          }
        },
      }),
      { name: 'authStore' },
    ),
  ),
);

export default useAuthStore;
