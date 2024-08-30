import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import authReducer from './authSlice';

// store에 매개변수는 reducer가 들어간다.
export const store = configureStore({
    reducer: {

        authControl: authReducer,
        onlineMall: productReducer,

    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;