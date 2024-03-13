// authReducer.ts
import { AuthState, AuthAction } from '../Actions/authTypes';

const initialState: AuthState = {
  isAuthenticated: false,
  role: undefined, 
  username:undefined,// Include the role property in the initial state
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        role: action.role,
        username:action.username // Set the role from the action
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        role: undefined,
        username:undefined // Reset the role on logout
      };
    default:
      return state;
  }
};

export default authReducer;
