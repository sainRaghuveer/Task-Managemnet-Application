'use client'
import React, { useState, useEffect } from 'react';
import Taskcard from "./components/Taskcard";
import Input from "./components/Input";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Page: React.FC = () => {
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

  // Adding new task
  const handleAddTask = (newTask: Task) => {
    if (!newTask.title || !newTask.description) {
      alert("Please enter a task title and description");
      return;
    }
    const taskId = Date.now().toString();
    const task: Task = {
      id: taskId,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    };
    setTasks([...tasks, task]);
    setNewTask({
      id: '',
      title: '',
      description: '',
      status: 'To Do',
    });
  };

  return (
    <div className="container mx-auto flex">
      <Input handleAddTask={handleAddTask} />
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        <ul>
          {tasks.map((task) => (
            <Taskcard
              key={task.id}
              task={task}
              editingTaskId={editingTaskId}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
