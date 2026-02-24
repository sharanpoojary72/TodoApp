// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todoReducer from '../features/todo/todoSlice';

// 1. Combine all reducers
const appReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
});

// 2. Create a Root Reducer that intercepts the logout action
const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        // This clears the entire Logic Tier state in memory
        state = undefined; 
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});