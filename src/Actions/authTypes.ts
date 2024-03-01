// authTypes.ts
export interface AuthState {
    isAuthenticated: boolean;
  }
  
  export type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };
  