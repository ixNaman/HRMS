// authTypes.ts
export interface AuthState {
  isAuthenticated: boolean;
  role?: string; 
  username?:string// Add the role property to AuthState
}

export type AuthAction = { type: 'LOGIN'; role?: string ,username?:string} | { type: 'LOGOUT' };
