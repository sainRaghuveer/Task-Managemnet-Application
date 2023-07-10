import React, { useState } from 'react';

interface InputProps {
  handleAddTask: (newTask: any) => void;
}

const Input: React.FC<InputProps> = ({ handleAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = () => {
    if (!newTask.title || !newTask.description) {
      alert('Please enter a task title and description');
      return;
    }
    handleAddTask(newTask);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
      <h2 className="text-2xl font-bold mb-2">Add New Task</h2>
      <div className="mb-8">
        {/* Adding New Task Form */}
        <div className="mb-4">
          <strong className="font-bold">Title: </strong>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <strong className="font-bold">Description: </strong>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleChange}
            className="border rounded py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <strong className="font-bold">Status: </strong>
          <select
            name="status"
            value={newTask.status}
            onChange={handleChange}
            className="border rounded py-2 px-3 w-full"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          onClick={()=>handleSubmit()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Input;
