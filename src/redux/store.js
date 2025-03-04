import { authSlice } from './auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { productoSlice } from './productos/productoSlice';
import { adminSlice } from './admin/adminSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        producto: productoSlice.reducer,
        admin: adminSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;