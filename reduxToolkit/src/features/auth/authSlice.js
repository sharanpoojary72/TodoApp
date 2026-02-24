// frontend/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/todos`;

// Helper to get token safely
const getValidToken = () => {
    const token = localStorage.getItem('token');
    if (token === 'undefined' || token === 'null' || !token) return null;
    return token;
};

const getValidUser = () => {
    const user = localStorage.getItem('user');
    try {
        // Defensive check: only parse if it's a valid JSON string
        return (user && user!== 'undefined' && user!== 'null')? JSON.parse(user) : null;
    } catch (e) {
        console.error("Logic Tier: Failed to parse user from storage", e);
        return null;
    }
};

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) return thunkAPI.rejectWithValue(data.message);
        return data; // { token, user }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (!response.ok) return thunkAPI.rejectWithValue(data.message);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// frontend/features/auth/authSlice.js

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: getValidUser(),
        token: getValidToken(),
        isAuthenticated: !!getValidToken(),
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            // Clear Background Layer
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Reset Middle Tier Logic
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // 1. ADD THIS CASE: Specifically handles the Login success
            .addCase(loginUser.fulfilled, (state, action) => {
                // SYNC: Grab the nested token key seen in your Turn 60 JSON
                const { token, user } = action.payload;
                if (token) {
                    state.token = token;
                    state.user = user;
                    state.isAuthenticated = true;
                    state.status = 'succeeded';
                    localStorage.setItem('token', token);
                    
                }
            })
            // 2. ADD THIS CASE: Handles the Register success
            .addCase(registerUser.fulfilled, (state, action) => {
                const { token, user } = action.payload;
                if (token) {
                    state.token = token;
                    state.user = user;
                    state.isAuthenticated = true;
                    state.status = 'succeeded';
                    localStorage.setItem('token', token);
                }
            })
            // 3. Keep your other generic matchers below the specific cases
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => { state.status = 'loading'; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;