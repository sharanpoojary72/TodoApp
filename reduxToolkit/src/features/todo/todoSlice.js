import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
// import initialTodos from '../../app/todosData.json'

const API_URL = 'https://todoapp-cmxp.onrender.com/api/todos';

const initialState = {
    todos: [],
    status: 'idle',
    error: null
};

// export const fetchTodos = createAsyncThunk(
//     'todos/fetchtodos',
//     async () => {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         return initialTodos;
//     }
// )


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {}, // Local reducers are mostly replaced by thunks
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                );
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    }
});

// Fetch all todos (GET)
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_, thunkAPI) => {
    // 1. Grab the token from state
    const token = thunkAPI.getState().auth.token;

    // DEBUG: If this prints "Bearer null" in your browser console, 
    // the Logic Layer is empty!

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}` // Ensure there is a space after Bearer
        }
    });
    if (!response.ok) throw new Error('Unauthorized');
    return response.json();
});

// Add a todo (POST)
export const addTodoAsync = createAsyncThunk(
    'todo/addTodoAsync',
    async (text, thunkAPI) => { // 1. Add thunkAPI here
        // 2. Grab the token from the Logic Tier
        const token = thunkAPI.getState().auth.token;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 3. Attach the Digital Passport
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Unauthorized');
        return response.json();
    }
);
// Edit a todo (PATCH)
export const editTodoAsync = createAsyncThunk('todo/editTodoAsync', async ({ id, text }, thunkAPI) => {

    const token = thunkAPI.getState().auth.token;

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Unauthorized');
    return response.json();
});

// Remove a todo (DELETE)
export const removeTodoAsync = createAsyncThunk('todo/removeTodoAsync', async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return id; // Return the ID so we can remove it from local state
});

export const { addTodo, removeTodo, editTodos } = todoSlice.actions;

export default todoSlice.reducer;