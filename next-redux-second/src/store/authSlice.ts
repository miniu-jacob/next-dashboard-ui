import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isLogin: boolean;
}

const initialState: AuthState = {
    isLogin: false,
};

// createSlice 는 3개의 매개변수를 받는다. 
const authSlice = createSlice({
    name: 'authControl',
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;