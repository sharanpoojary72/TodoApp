import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {addTodoAsync} from '../features/todo/todoSlice'
import './AddTodo.css'

const AddTodo = () => {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const addTodoHandler = (e) =>{
        e.preventDefault();
        dispatch(addTodoAsync(input));
        setInput('');
    }

    return (
        <form onSubmit={addTodoHandler} className='add-todo'>
            <input type="text" placeholder='Enter a Todo...' value={input} onChange={(e) => setInput(e.target.value)} />
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default AddTodo