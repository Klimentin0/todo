import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTaskSaved = () => {
        setTaskToEdit(null);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4 text-center">Список задач</h1>
            <TaskForm taskToEdit={taskToEdit} onTaskSaved={handleTaskSaved} />
            <TaskList 
                onEditTask={setTaskToEdit} 
                refreshKey={refreshKey} 
            />
        </Container>
    );
}

export default App;