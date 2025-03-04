import React, { useState } from 'react';
import api from '../api/api';

const TaskForm = ({ taskToEdit, onTaskSaved }) => {
    const [title, setTitle] = useState(taskToEdit?.title || '');
    const [description, setDescription] = useState(taskToEdit?.description || '');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const taskData = { title, description };

            if (taskToEdit?.id) {
                await api.patch(`/tasks/${taskToEdit.id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }

            onTaskSaved();
        } catch (err) {
            console.error('Ошибка сохранения:', err);
            setError(err.response?.data?.message || 'Произошла ошибка');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div>
                <label>Задача:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Описание:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">{taskToEdit ? 'Изменить' : 'Добавить'}</button>
        </form>
    );
};

export default TaskForm;