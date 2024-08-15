import React, { useReducer, useState } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import TodoPanel from './components/TodoPanel/TodoPanel';
import './TodoApp.css';

// Типы для задач и действий
export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type Action =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: number }
    | { type: 'DELETE_TODO'; id: number }
    | { type: 'CLEAR_COMPLETED' };

const reducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { id: Date.now(), text: action.text, completed: false }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'CLEAR_COMPLETED':
            return state.filter(todo => !todo.completed);
        default:
            return state;
    }
};

const TodoApp = () => {
    const [todos, dispatch] = useReducer(reducer, []);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
    });

    return (
        <div className="app">
            <TodoInput onAddTodo={text => dispatch({ type: 'ADD_TODO', text })} />
            <TodoList
                todos={filteredTodos}
                toggleTodo={id => dispatch({ type: 'TOGGLE_TODO', id })}
                deleteTodo={id => dispatch({ type: 'DELETE_TODO', id })}
            />
            <TodoPanel
                todos={todos}
                filter={filter}
                setFilter={setFilter}
                clearCompleted={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            />
        </div>
    );
};

export default TodoApp;
