'use client'
import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState('');
  const [newTask, setNewTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    status: 'To Do',
  });


  // Loading tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  // Saving tasks to local storage whenever the task list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleEdit = (taskId: string) => {
    setEditingTaskId(taskId);
  };


   // Updating the task in the task list
  const handleSave = (task: Task) => {
    setEditingTaskId('');

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, ...task } : t
    );
    setTasks(updatedTasks);
  };

  const handleCancel = () => {
    setEditingTaskId('');
  };


  // Removing the task from the task list
  const handleDelete = (taskId: string) => { 
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };


  //Adding new task
  const handleAddTask = () => {
    if(!newTask.title || !newTask.description){
      alert("Please select a task title or description");
      return;
    }
    if (newTask.title && newTask.description) {
      // Generating a unique ID for the new task
      const taskId = Date.now().toString();

      const task: Task = {
        id: taskId,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      };

      // Adding the new task to the task list
      setTasks([...tasks, task]);

      // Reseting the new task input
      setNewTask({
        id: '',
        title: '',
        description: '',
        status: 'To Do',
      });
    }
  };

  return (
    <div className="container mx-auto flex">
      {/* Sidebar  */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-3xl font-bold mb-4">Task Management</h1>
        <h2 className="text-2xl font-bold mb-2">Add New Task</h2>
        <div className="mb-8">
          {/* Adding New Task Form */}
          <div className="mb-4">
            <strong className="font-bold">Title: </strong>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prevTask) => ({ ...prevTask, title: e.target.value }))
              }
              className="border rounded py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <strong className="font-bold">Description: </strong>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prevTask) => ({ ...prevTask, description: e.target.value }))
              }
              className="border rounded py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <strong className="font-bold">Status: </strong>
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask((prevTask) => ({ ...prevTask, status: e.target.value }))
              }
              className="border rounded py-2 px-3 w-full"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            onClick={handleAddTask}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List rendering */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4 task-item">
              {/* Task Details as provided */}
              <div>
                <strong className="font-bold">Title: </strong>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id ? { ...t, title: e.target.value } : t
                        )
                      )
                    }
                    className="border rounded py-2 px-3 w-full"
                  />
                ) : (
                  task.title
                )}
              </div>
              <div>
                <strong className="font-bold">Description: </strong>
                {editingTaskId === task.id ? (
                  <textarea
                    value={task.description}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id
                            ? { ...t, description: e.target.value }
                            : t
                        )
                      )
                    }
                    className="border rounded py-2 px-3 w-full"
                  />
                ) : (
                  task.description
                )}
              </div>
              <div>
                <strong className="font-bold">Status: </strong>
                {editingTaskId === task.id ? (
                  <select
                    value={task.status}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t) =>
                          t.id === task.id ? { ...t, status: e.target.value } : t
                        )
                      )
                    }
                    className="border rounded py-2 px-3 w-full"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </div>
              <div className="mt-2">
                {editingTaskId === task.id ? (
                  <button
                    onClick={() => handleSave(task)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
                {editingTaskId === task.id && (
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
