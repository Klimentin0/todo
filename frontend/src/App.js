import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); 

    const handleTaskSaved = () => {
        setTaskToEdit(null); 
        setRefreshKey(prev => prev + 1); 
    };

    return (
        <div className="App">
            <h1>Список задач.</h1>
            <TaskForm taskToEdit={taskToEdit} onTaskSaved={handleTaskSaved} />
            <TaskList 
                onEditTask={setTaskToEdit} 
                refreshKey={refreshKey} 
            />
        </div>
    );
}

export default App;