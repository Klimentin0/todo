import React, { useEffect, useState } from 'react';
import api from '../api/api';

const TaskList = ({ onEditTask, refreshKey }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null); // Состояние для выбранной задачи

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tasks');
            
            if (!Array.isArray(response.data)) {
                throw new Error('Invalid response format');
            }
            
            setTasks(response.data);
            setError(null);
        } catch (err) {
            console.error('Ошибка при загрузке задач:', err);
            setError('Не удалось загрузить задачи');
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refreshKey]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            await fetchTasks();
        } catch (err) {
            console.error('Ошибка при удалении:', err);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await api.put(`/tasks/${task.id}`, { 
                ...task, 
                completed: !task.completed 
            });
            await fetchTasks();
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
        }
    };

    const handleShowDescription = (task) => {
        setSelectedTask(task); // Устанавливаем выбранную задачу
    };

    if (loading) {
        return <p>Загрузка задач...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h2>Задачи</h2>
            {tasks.length === 0 ? (
                <p>Нет текущих задач.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <span style={{ 
                                textDecoration: task.completed ? 'line-through' : 'none' 
                            }}>
                                {task.title}
                            </span>
                            <button onClick={() => onEditTask(task)}>Изменить</button>
                            <button onClick={() => handleDelete(task.id)}>Удалить</button>
                            <button onClick={() => handleToggleComplete(task)}>
                                {task.completed ? 'Отметить невыполненной' : 'Отметить выполненной'}
                            </button>
                            <button onClick={() => handleShowDescription(task)}>Показать описание</button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedTask && (
                <div>
                    <h3>Описание задачи: {selectedTask.title}</h3>
                    <p>{selectedTask.description || 'Описание отсутствует'}</p>
                    <button onClick={() => setSelectedTask(null)}>Скрыть описание</button>
                </div>
            )}
        </div>
    );
};

export default TaskList;