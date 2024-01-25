import React, { useState, useEffect } from 'react';
import '../App.css'; 
import AddTaskForm from './addtaskform';
import EditTaskForm from './edittaskform';
import DeleteTask from './deletetask';

const TaskTable = () => {

    const storedLocalKeys = Object.keys(localStorage);
    console.log("these are the keys", storedLocalKeys);
    const storedLocalValues = Object.values(localStorage);
    console.log("these are the values", storedLocalValues);
    let totalTasks = storedLocalValues.length;
    let i = 0;
    
    const detailedTasks = storedLocalValues.map (it => {
        console.log("iterator ", it);
        var json = JSON.parse(it);
        console.log("Parsed JSON ", json);

        let task = {
            id: json.id,
            title: json.title,
            description: json.description,
            priority: json.priority,
            dueDate: json.dueDate,
        }

        return task;
    });

  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'overdue', 'completed'
  const [tasksObject, setTasksObject] = useState(detailedTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (newTask) => {
    // Add the new task to localStorage
    localStorage.setItem(newTask.id, JSON.stringify(newTask));

    // Update tasksObject state
    setTasksObject(prevTasks => [...prevTasks, newTask]);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = (task) => {
    setSelectedTask(task);
    setShowEditForm(!showEditForm);
  };

  const handleEditTask = (editedTask) => {
    // Update the edited task in localStorage
    localStorage.setItem(editedTask.id, JSON.stringify(editedTask));

    // Update tasksObject state
    setTasksObject(prevTasks =>
      prevTasks.map(task =>
        task.id === editedTask.id ? { ...task, ...editedTask } : task
      )
    );

    // Close the form
    setShowEditForm(false);
  };

  const deleteLocalTask = (taskID) => {
    console.log("i was deleted, oh no");
    localStorage.removeItem(taskID);
    console.log("you deleted this -> ", localStorage.getItem(taskID));
}

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
          <div className="flex-1 p-2"> 
          <button className="bg-cyan-200 border-solid shadow-md p-2 rounded hover:bg-blue-600" onClick={toggleAddForm}>
         Add Task
         </button>
         {showAddForm && <AddTaskForm onAddTask={handleAddTask} onClose={toggleAddForm} />}
        </div>
        </div>

        {tasksObject && tasksObject.length > 0 && (
        <div >
        {tasksObject.map(task => (
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
              <div className="flex-1 p-2 hover:bg-cyan-50">
              {/* <button className="bg-cyan-200 border-solid shadow-md p-2" onClick={editLocalStorage}>
                Edit
            </button> */}
            <button onClick={() => toggleEditForm(task)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
            Edit
          </button>
          <button className="bg-cyan-200 border-2 border-slate-800 
            rounded-lg shadow-md p-1 hover:bg-cyan-500 hover:text-white
            hover:shadow-xl" onClick={() => deleteLocalTask(task.id)}>
                Delete
            </button>
         {showEditForm && selectedTask && <EditTaskForm task={selectedTask} onEditTask={handleEditTask} onClose={() => setShowEditForm(false)} />}
              </div>
            </div>
        ))}      
       </div>
        )}

        {/* {filteredTasks().map(task => (
          <div key={task.id} className="flex bg-white-100 text-black 
          rounded-md border border-dashed text-center shadow-md font-mono ">
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{tasksObject.title}</div>
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{tasksObject.description}</div>
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{tasksObject.dueDate}</div>
            <div className="flex-1 p-2 border-dashed border-2 
            hover:border-black hover:border-solid hover:bg-cyan-50">{tasksObject.priority}</div>
            <div className="flex-1 p-2 hover:bg-cyan-50">
                <EditTask taskID={newtaskID} task={tasks[1]} />
                <DeleteTask taskID={taskID} />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default TaskTable;

