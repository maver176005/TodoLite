import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import TodoPanel from './TodoPanel';
import '@testing-library/jest-dom';


test('TodoPanel renders correctly and interacts properly', () => {
    const mockSetFilter = jest.fn();
    const mockClearCompleted = jest.fn();
    const todos = [
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Learn TypeScript', completed: true }
    ];

    render(
        <TodoPanel
            todos={todos}
            filter="all"
            setFilter={mockSetFilter}
            clearCompleted={mockClearCompleted}
        />
    );

    expect(screen.getByText(/Всего задач: 1/i)).toBeInTheDocument();


    fireEvent.click(screen.getByText('Активные'));

    expect(mockSetFilter).toHaveBeenCalledWith('active');
});
