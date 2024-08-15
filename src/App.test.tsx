import { render, screen, fireEvent } from "@testing-library/react";
import App from './TodoApp';
import '@testing-library/jest-dom';

test('добавление и завершение задачи', async () => {
    render(<App />);

    // Ввод новой задачи
    const input = screen.getByPlaceholderText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.submit(input);

    // Проверка добавления задачи
    const taskElement = await screen.findByText('Тестовая задача');

    // Отметка задачи как завершённой
    fireEvent.click(taskElement);

    // Пытаемся добавить пустую задачу
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(input);

    // Проверяем, что ни одной задачи не добавлено
    expect(screen.queryByRole('list item')).not.toBeInTheDocument();

    // Проверка наличия класса 'completed' без использования .toHaveClass
    expect(taskElement.closest('.todo-item')?.classList.contains('completed')).toBe(true);
});

test('фильтрация задач (все/активные/завершённые)', async () => {
    render(<App />);

    // Добавляем три задачи
    const input = screen.getByPlaceholderText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);

    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);

    fireEvent.change(input, { target: { value: 'Задача 3' } });
    fireEvent.submit(input);

    // Завершаем одну задачу
    const task1 = await screen.findByText('Задача 1');
    fireEvent.click(task1);

    // Фильтрация завершённых задач
    const completedFilter = screen.getByText('Завершенные');
    fireEvent.click(completedFilter);

    // Проверяем, что только завершённые задачи отображаются
    const completedTasks = screen.getAllByText(/Задача 1/i);
    expect(completedTasks.length).toBe(1);

    // Проверяем, что задачи 2 и 3 не отображаются
    expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();
});

test('удаление задачи', async () => {
    render(<App />);

    // Добавляем задачу
    const input = screen.getByPlaceholderText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'Тестовая задача для удаления' } });
    fireEvent.submit(input);

    // Удаляем задачу
    const taskElement = await screen.findByText('Тестовая задача для удаления');
    const deleteButton = taskElement.closest('.todo-item')?.querySelector('button');

    if (deleteButton) {
        fireEvent.click(deleteButton);
    }

    // Проверяем, что задача удалена
    expect(screen.queryByText('Тестовая задача для удаления')).not.toBeInTheDocument();
});

test('удаление всех завершённых задач', async () => {
    render(<App />);

    // Добавляем две задачи
    const input = screen.getByPlaceholderText(/Новая задача/i);
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);

    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);

    // Завершаем одну задачу
    const task1 = await screen.findByText('Задача 1');
    fireEvent.click(task1);

    // Нажимаем на кнопку удаления завершённых задач
    const clearCompletedButton = screen.getByText('Удалить Завершенные');
    fireEvent.click(clearCompletedButton);

    // Проверяем, что завершённая задача удалена
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();

    // Проверяем, что незавершённая задача остаётся
    expect(screen.queryByText('Задача 2')).toBeInTheDocument();
});


