import { createAction, props } from "@ngrx/store";
import { IUser } from "../../../features/dashboard/users/user.model";

export const setAuthUser = createAction('[Auth] set auth user', props<{ payload: IUser}>());