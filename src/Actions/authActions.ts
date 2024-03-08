// authActions.ts
import { AuthAction } from './authTypes';

export const login = (): AuthAction => ({
  type: 'LOGIN',
});

export const logout = (): AuthAction => ({
  type: 'LOGOUT',
});


