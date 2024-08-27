import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './usersReducer';


export const store = configureStore({
    reducer: {
        userInfo: contactReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
