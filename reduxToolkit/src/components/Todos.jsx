import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../features/todo/todoSlice'
import { logout } from '../features/auth/authSlice'
import './Todos.css'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'

import { useEffect } from 'react'
// Note: Assuming 'TodoList' component is not needed, as the list rendering logic is here.

const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todo.todos);
    const todoStatus = useSelector(state => state.todo.status)

    // CORRECTION 1: Added empty dependency array to ensure fetch runs only once on mount.
    useEffect(() => {
        if (todoStatus === 'idle') {
            dispatch(fetchTodos())
        }
    },)


    if (todoStatus === 'loading') {
        // --- Display loading state ---
        return <p>Loading initial todo list...</p>;
    }

    if (todoStatus === 'failed') {
        // --- Display failure state ---
        return <p>Error loading todos.</p>;
    }

    // CORRECTION 2: Removed the redundant 'content' variable logic.
    // The component returns the list only after the 'succeeded' status is implied 
    // (i.e., not loading and not failed).

    return (
        // CRITICAL CORRECTION 3: The <li> elements MUST be wrapped in a parent <ul> or <ol>.
        <div>
            <div className='logout'>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
            <h1 className='title'>To-Do List</h1>
            <AddTodo />
            <ul className='todo-list'>
                {todos?.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}

export default Todos