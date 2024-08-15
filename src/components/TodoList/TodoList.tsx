import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

interface TodoListProps {
    todos: { id: number; text: string; completed: boolean }[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
