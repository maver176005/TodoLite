import React from 'react';
import './TodoPanel.css';
interface TodoPanelProps {
    todos: { id: number; text: string; completed: boolean }[];
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    clearCompleted: () => void;
}

const TodoPanel: React.FC<TodoPanelProps> = ({ todos, filter, setFilter, clearCompleted }) => {
    const remainingTodosCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className="panel">
            <span>Всего задач: {remainingTodosCount}</span>
            <div className="filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Все
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Активные
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Завершенные
                </button>

                <button onClick={clearCompleted}>
                    Удалить Завершенные
                </button>
            </div>
        </div>
    );
};

export default TodoPanel;
