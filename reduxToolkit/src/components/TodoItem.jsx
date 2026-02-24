import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodoAsync } from '../features/todo/todoSlice';
import EditTodo from './EditTodo'

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleDelete = () => {
        // 1. Trigger the visual Top Tier (#9E8DEC) change instantly
        setIsDeleting(true);

        // 2. Set a timer to perform the Foundation Tier (#5528A5) removal
        setTimeout(() => {
            dispatch(removeTodoAsync(todo.id));
        }, 1500); // 800ms allows the user to see the strikethrough result
    };

    return (
        <li className={isDeleting ? 'strikethrough' : ''}>
            <div className='todos'>
                {/* Checkbox now handles the entire deletion lifecycle */}
                <input
                    type="checkbox"
                    checked={isDeleting || todo.completed}
                    onChange={handleToggleDelete}
                />

                <div className='todostext'>
                    {todo.text}
                </div>

                <div>
                    <EditTodo id={todo.id} text={todo.text} />
                </div>
            </div>
        </li>
    );
};

export default TodoItem;