import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../../features/dashboard/users/user.model";
import { setAuthUser } from "./auth.actions";

export const authFeatureName = 'auth';

export interface AuthState {
    authUser: IUser | null;
}

const initialState : AuthState = {
    authUser: null
}

export const authReducer = createReducer(initialState, 
    on(setAuthUser, (state, action) => {
        return {
            ...state,
            authUser: action.payload
        }
    })
)