import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
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
        <Form onSubmit={handleSubmit} className="mb-4 card p-3">
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
                <Form.Label>Задача:</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Введите название задачи"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Описание:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Добавьте описание задачи"
                />
            </Form.Group>

            <Button 
                variant={taskToEdit ? "warning" : "primary"} 
                type="submit"
                className="w-100"
            >
                {taskToEdit ? 'Изменить задачу' : 'Добавить задачу'}
            </Button>
        </Form>
    );
};

export default TaskForm;