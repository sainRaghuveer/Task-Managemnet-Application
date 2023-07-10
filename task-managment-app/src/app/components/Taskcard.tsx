import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  editingTaskId: string;
  handleEdit: (taskId: string) => void;
  handleSave: (task: Task) => void;
  handleDelete: (taskId: string) => void;
  handleCancel: () => void;
}

const Taskcard: React.FC<TaskCardProps> = ({
  task,
  editingTaskId,
  handleEdit,
  handleSave,
  handleDelete,
  handleCancel,
}) => {
  return (
    <li key={task.id} className="mb-4 task-item">
      {/* Rendering Task Details as provided by parent component Page.tsx */}
      <div>
        <strong className="font-bold">Title: </strong>
        {editingTaskId === task.id ? (
          <input
            type="text"
            value={task.title}
            onChange={(e) => handleSave({ ...task, title: e.target.value })}
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
            onChange={(e) => handleSave({ ...task, description: e.target.value })}
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
            onChange={(e) => handleSave({ ...task, status: e.target.value })}
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
  );
};

export default Taskcard;
