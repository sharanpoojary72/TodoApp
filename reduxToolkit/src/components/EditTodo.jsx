import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTodoAsync } from '../features/todo/todoSlice'
import Modal from './Modal'

// CORRECTION 1: Props are correctly received via object destructuring ({ id, text })
const EditTodo = ({ id, text }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // CORRECTION 2: The input state is initialized with the existing 'text' prop 
    // to allow the user to see and edit the current value.
    const [input, setInput] = useState(text);


    const dispatch = useDispatch();

    const toggleModal = () => setIsModalOpen(!isModalOpen);


    const editTodoHandler = (e) => {
    e.preventDefault();
    // Dispatch the ASYNC version to save to MongoDB
    dispatch(editTodoAsync({ id, text: input })); 
    setInput('');
    toggleModal(); 
}


    return (
        <div className='edit-todo'>
            <button onClick={toggleModal}>Edit</button>
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <form onSubmit={editTodoHandler}>
                    <h3>Edit Todo</h3>
                    <input
                        type="text"
                        placeholder={text}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    {/* CORRECTION 4: Removed the conflicting onClick={toggleModal}
                        from the submit button. The modal is now closed by the 
                        editTodoHandler function upon successful submission.
                    */}
                    <button type='submit'>Edit</button>
                </form>
            </Modal>
        </div>
    )
}

export default EditTodo