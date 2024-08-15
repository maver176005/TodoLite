import React, { useState } from 'react';
import './TodoInput.css';

interface TodoInputProps {
    onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onAddTodo(input);
            setInput(''); // Очистка после добавления
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                role="checkbox"
                type="text"
                className="todo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Новая задача..."
            />
        </form>
    );
};

export default TodoInput;
