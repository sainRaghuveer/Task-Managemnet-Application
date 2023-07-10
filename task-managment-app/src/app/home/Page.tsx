import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { types, Instance } from 'mobx-state-tree';

// MST Model definition
const Task = types
  .model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.enumeration(['To Do', 'In Progress', 'Completed']),
  })
  .actions((self) => ({
    updateTitle(title: string) {
      self.title = title;
    },
    updateDescription(description: string) {
      self.description = description;
    },
    updateStatus(status: string) {
      self.status = status;
    },
  }));

const TaskList = types.model('TaskList', {
  tasks: types.array(Task),
});

type ITask = Instance<typeof Task>;

// Store for managing tasks
const TaskStore = TaskList.create();

const HomePage: React.FC = observer(() => {
  const [editingTaskId, setEditingTaskId] = useState('');
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    description: '',
    status: 'To Do',
  });

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      TaskStore.tasks.replace(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever the task list changes
    localStorage.setItem('tasks', JSON.stringify(TaskStore.tasks));
  }, [TaskStore.tasks]);

  const handleEdit = (taskId: string) => {
    setEditingTaskId(taskId);
  };

  const handleSave = (task: ITask) => {
    setEditingTaskId('');

    // Save the updated task using MST action
    TaskStore.tasks.find((t) => t.id === task.id)?.updateTitle(task.title);
    TaskStore.tasks.find((t) => t.id === task.id)?.updateDescription(
      task.description
    );
    TaskStore.tasks.find((t) => t.id === task.id)?.updateStatus(task.status);
  };

  const handleCancel = () => {
    setEditingTaskId('');
  };

  const handleDelete = (taskId: string) => {
    // Remove the task from the task list using MST action
    const index = TaskStore.tasks.findIndex((t) => t.id === taskId);
    if (index >= 0) {
      TaskStore.tasks.splice(index, 1);
    }
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      // Generate a unique ID for the new task
      const taskId = Date.now().toString();

      // Create a new task using MST action and add it to the task list
      TaskStore.tasks.push({
        ...newTask,
        id: taskId,
      });

      // Reset the new task input
      setNewTask({
        id: '',
        title: '',
        description: '',
        status: 'To Do',
      });
    }
  };

  return (
    <div>
      <h1>Task Management</h1>

      {/* Task List */}
      <ul>
        {TaskStore.tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>Title: </strong>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>
                    TaskStore.tasks.find((t) => t.id === task.id)?.updateTitle(e.target.value)
                  }
                />
              ) : (
                task.title
              )}
            </div>
            <div>
              <strong>Description: </strong>
              {editingTaskId === task.id ? (
                <textarea
                  value={task.description}
                  onChange={(e) =>
                    TaskStore.tasks.find((t) => t.id === task.id)?.updateDescription(e.target.value)
                  }
                />
              ) : (
                task.description
              )}
            </div>
            <div>
              <strong>Status: </strong>
              {editingTaskId === task.id ? (
                <select
                  value={task.status}
                  onChange={(e) =>
                    TaskStore.tasks.find((t) => t.id === task.id)?.updateStatus(e.target.value)
                  }
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                task.status
              )}
            </div>
            <div>
              {editingTaskId === task.id ? (
                <button onClick={() => handleSave(task)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(task.id)}>Edit</button>
              )}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              {editingTaskId === task.id && (
                <button onClick={handleCancel}>Cancel</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Add New Task */}
      <h2>Add New Task</h2>
      <div>
        <div>
          <strong>Title: </strong>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />
        </div>
        <div>
          <strong>Description: </strong>
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>
        <div>
          <strong>Status: </strong>
          <select
            value={newTask.status}
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
});

export default HomePage;
