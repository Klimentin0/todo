import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Card, Alert, Badge } from 'react-bootstrap';
import api from '../api/api';

const TaskList = ({ onEditTask, refreshKey }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

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
        setSelectedTask(task);
    };

    if (loading) {
        return <Alert variant="info">Загрузка задач...</Alert>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title as="h2" className="mb-4">Список задач</Card.Title>
                
                {tasks.length === 0 ? (
                    <Alert variant="info">Нет текущих задач.</Alert>
                ) : (
                    <ListGroup>
                        {tasks.map((task) => (
                            <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                                <div className="me-3">
                                    <span 
                                        style={{ 
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        {task.title}
                                        {task.completed && (
                                            <Badge bg="success" className="ms-2">Выполнено</Badge>
                                        )}
                                    </span>
                                </div>
                                
                                <div>
                                    <Button 
                                        variant="outline-warning" 
                                        size="sm" 
                                        onClick={() => onEditTask(task)}
                                        className="me-2"
                                    >
                                        Изменить
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => handleDelete(task.id)}
                                        className="me-2"
                                    >
                                        Удалить
                                    </Button>
                                    <Button 
                                        variant={task.completed ? "outline-secondary" : "outline-success"} 
                                        size="sm" 
                                        onClick={() => handleToggleComplete(task)}
                                        className="me-2"
                                    >
                                        {task.completed ? 'Не выполнена' : 'Выполнена'}
                                    </Button>
                                    <Button 
                                        variant="outline-info" 
                                        size="sm" 
                                        onClick={() => handleShowDescription(task)}
                                    >
                                        Описание
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                {selectedTask && (
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title as="h3" className="mb-3">
                                Описание задачи: {selectedTask.title}
                            </Card.Title>
                            <Card.Text>
                                {selectedTask.description || 'Описание отсутствует'}
                            </Card.Text>
                            <Button 
                                variant="secondary" 
                                onClick={() => setSelectedTask(null)}
                            >
                                Скрыть описание
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Card.Body>
        </Card>
    );
};

export default TaskList;