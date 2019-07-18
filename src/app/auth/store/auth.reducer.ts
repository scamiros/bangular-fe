import { Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './../../_models/user';

export interface State {
    user: User
}

const initialState: State = {
    user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    console.log(state);
    switch(action.type) {
        case AuthActions.LOGIN:
            
            const user = new User(
                action.payload.id, action.payload.username, 
                action.payload.firstName, action.payload.token, action.payload.expiration);
            return {
                ...state,
                user: user 
            }
        case AuthActions.LOGOUT: 
        return {
            ...state,
            user: null
        }
        default:
            return state;
    }
}