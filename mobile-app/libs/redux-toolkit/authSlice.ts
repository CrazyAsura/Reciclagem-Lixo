import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface AuthState {
    user: User;
    isLoggedIn: boolean | null;
    token: string | null;
}

const initialState: AuthState = {
    user: {} as User,
    isLoggedIn: false,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        login: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
})

export const { register, login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;