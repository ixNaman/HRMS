// authReducer.ts
import { AuthState, AuthAction } from '../Actions/authTypes';

const initialState: AuthState = {
  isAuthenticated: false,
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
