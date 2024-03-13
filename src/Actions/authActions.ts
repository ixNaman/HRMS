// authActions.ts
import { AuthAction } from './authTypes';

export const login = (role: string , username:string): AuthAction => ({
  type: 'LOGIN',
  role,
  username,
});

export const logout = (): AuthAction => ({
  type: 'LOGOUT',
});
