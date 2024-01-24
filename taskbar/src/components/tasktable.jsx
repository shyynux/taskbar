import React, { useState } from 'react';
import '../App.css'; 

const TaskTable = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'overdue', 'completed'

  const tasks = [
    {
      id: 1,
      title: 'Complete Taskbar',
      description: 'Create a task management webapp',
      dueDate: '2024-01-26',
      priority: 'high',
      completed: false,
    },
    {
      id: 2,
      title: 'Deploy on Vercel',
      description: 'Deploy the code on vercel',
      dueDate: '2024-01-26',
      priority: 'medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Answer the questions',
      description: 'Answer the questions that follows',
      dueDate: '2024-01-26',
      priority: 'low',
      completed: true,
    },
  ];
  

  const filteredTasks = () => {
    switch (filter) {
        case 'upcoming':
          return tasks.filter(task => isUpcoming(task.dueDate));
        case 'overdue':
          return tasks.filter(task => isOverdue(task.dueDate));
        case 'completed':
          return tasks.filter(task => task.completed);
        default:
          return tasks;
      }
    }
      const isUpcoming = (dueDate) => {
        // Your logic to determine if the task is upcoming
        // For example, compare the due date with the current date
        const currentDate = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate > currentDate;
      };
      
      const isOverdue = (dueDate) => {
        // Your logic to determine if the task is overdue
        // For example, compare the due date with the current date
        const currentDate = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate < currentDate;
      };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center mb-4">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'btn-active' : 'btn'}>
          All Tasks
        </button>
        <button onClick={() => setFilter('upcoming')} className={filter === 'upcoming' ? 'btn-active' : 'btn'}>
          Upcoming Tasks
        </button>
        <button onClick={() => setFilter('overdue')} className={filter === 'overdue' ? 'btn-active' : 'btn'}>
          Overdue Tasks
        </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'btn-active' : 'btn'}>
          Completed Tasks
        </button>
      </div>

      <div className="flex flex-col font-mono">
        <div className="flex bg-cyan-100 text-black rounded-md border border-black text-center">
          <div className="flex-1 p-2 border border-black">Title</div>
          <div className="flex-1 p-2 border border-black">Description</div>
          <div className="flex-1 p-2 border border-black">Due Date</div>
          <div className="flex-1 p-2 border border-black">Priority</div>
          <div className="flex-1 p-2">add</div>
        </div>

        {filteredTasks().map(task => (
          <div key={task.id} className="flex bg-white-100 text-black 
          rounded-md border border-dashed text-center shadow-md font-mono ">
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{task.title}</div>
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{task.description}</div>
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{task.dueDate}</div>
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{task.priority}</div>
            <div className="flex-1 p-2 hover:bg-cyan-50">Edit / delete</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
