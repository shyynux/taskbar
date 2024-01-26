import React, { useState, useEffect } from "react";
import "../App.css";
import AddTaskForm from "./addtaskform";
import EditTaskForm from "./edittaskform";
import DeleteTask from "./deletetask";
import SearchBar from "./searchbar";

const status = ["UPCOMING", "COMPLETED", "OVERDUE", "ALL"];

const populateStatus = (newTask) => {
  var taskStatus = newTask.status;
  var currentDate = new Date();
  var taskDate = new Date(newTask.dueDate);

  if (taskStatus !== null && taskStatus === status[1]) {
    // do nothing
  } else if (taskDate < currentDate) {
    newTask.status = status[2];
  } else if (taskDate >= currentDate) {
    newTask.status = status[0];
  }
};

const populateTasks = () => {
  const storedLocalValues = Object.values(localStorage);

  return storedLocalValues.map((it) => {
    var json = JSON.parse(it);

    let task = {
      id: json.id,
      title: json.title,
      description: json.description,
      priority: json.priority,
      dueDate: json.dueDate,
      status: json.status,
    };

    populateStatus(task);

    return task;
  });
};

const TaskTable = () => {
  console.log("render");
  const [tasksObject, setTasksObject] = useState(populateTasks());
  const [filter, setFilter] = useState(status[3]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  console.log("taskObje", tasksObject);

  const handleAddTask = (newTask) => {
    // Add the new task to localStorage
    populateStatus(newTask);

    localStorage.setItem(newTask.id, JSON.stringify(newTask));

    // Update tasksObject state
    setTasksObject((prevTasks) => [...prevTasks, newTask]);

	filterTasks(filter);
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
    populateStatus(editedTask);

    localStorage.setItem(editedTask.id, JSON.stringify(editedTask));

    // Update tasksObject state
    setTasksObject((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editedTask.id ? { ...task, ...editedTask } : task
      )
    );

    // Close the form
    setShowEditForm(false);
	filterTasks(filter);
  };

  const deleteLocalTask = (taskID) => {
    localStorage.removeItem(taskID);
    setTasksObject(populateTasks());
	filterTasks(filter);
  };

  const updateStatus = (task) => {
    var taskStatus = task.status;
    console.log("i was clicked");
    console.log(task);
    console.log(taskStatus);
    if (taskStatus == status[1]) {
      task.status = null;
      populateStatus(task);
    } else {
      task.status = status[1];
    }

    localStorage.setItem(task.id, JSON.stringify(task));
    setTasksObject((prevTasks) =>
      prevTasks.map((it) => (it.id === task.id ? { ...it, ...task } : it))
    );

	filterTasks(filter);
  };

  const filterTasks = (filterStatus) => {
	setFilter(filterStatus);
    const allTasks = populateTasks();
    switch (filterStatus) {
      case status[0]:
        setTasksObject(allTasks.filter((task) => task.status === status[0]));
        break;
      case status[2]:
        setTasksObject(allTasks.filter((task) => task.status === status[2]));
        break;
      case status[1]:
        setTasksObject(allTasks.filter((task) => task.status === status[1]));
        break;
      default:
        console.log("default");
        setTasksObject(allTasks);
        break;
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <SearchBar tasksObject={tasksObject} />
      <div className="flex items-center mb-4">
  <div
    onClick={() => filterTasks(status[3])}
    className="flex-1 text-center py-2 bg-cyan-200 border-2 border-slate-800 rounded-tl-lg rounded-bl-lg shadow-md hover:bg-cyan-500 hover:text-white cursor-pointer"
  >
    All Tasks
  </div>
  <div
    onClick={() => filterTasks(status[0])}
    className="flex-1 text-center py-2 bg-cyan-200 border-2 border-slate-800 shadow-md hover:bg-cyan-500 hover:text-white cursor-pointer"
  >
    Upcoming Tasks
  </div>
  <div
    onClick={() => filterTasks(status[2])}
    className="flex-1 text-center py-2 bg-cyan-200 border-2 border-slate-800 shadow-md hover:bg-cyan-500 hover:text-white cursor-pointer"
  >
    Overdue Tasks
  </div>
  <div
    onClick={() => filterTasks(status[1])}
    className="flex-1 text-center py-2 bg-cyan-200 border-2 border-slate-800 rounded-tr-lg rounded-br-lg shadow-md hover:bg-cyan-500 hover:text-white cursor-pointer"
  >
    Completed Tasks
  </div>
</div>

      <div className="flex flex-col font-mono">
        <div className="flex text-black rounded-md w-1/3">
          <div className="flex-1 p-2">
            <button
              className="bg-cyan-200 border-2 border-solid border-black shadow-md p-2 rounded 
          hover:bg-cyan-500 hover:text-white shadow-xl"
              onClick={toggleAddForm}>
              Add Task
            </button>
            {showAddForm && (
              <AddTaskForm onAddTask={handleAddTask} onClose={toggleAddForm} />
            )}
          </div>
        </div>

        {tasksObject && tasksObject.length > 0 && (
          <TaskGrid
            tasksObject={tasksObject}
            updateStatus={updateStatus}
            toggleEditForm={toggleEditForm}
            deleteLocalTask={deleteLocalTask}
            handleEditTask={handleEditTask}
            showEditForm={showEditForm}
            selectedTask={selectedTask}
            setShowEditForm={setShowAddForm}
          />
        )}
      </div>
    </div>
  );
};

const TaskGrid = ({
  tasksObject,
  updateStatus,
  toggleEditForm,
  deleteLocalTask,
  handleEditTask,
  showEditForm,
  selectedTask,
  setShowEditForm,
}) => {
  return (
	<table className="w-full table-auto border-2 m-2 border-black shadow-xl">
	<thead>
	  <tr className="bg-cyan-200 text-black border-2 border-black">
		<th className="p-2 border-2 border-black">Title</th>
		<th className="p-2 border-2 border-black">Description</th>
		<th className="p-2 border-2 border-black">Due Date</th>
		<th className="p-2 border-2 border-black">Priority</th>
		<th className="p-2 border-2 border-black">Status</th>
		<th className="p-2 border-2 border-black">Update Status</th>
		<th className="p-2">Actions</th>
	  </tr>
	</thead>
	<tbody>
	  {tasksObject.map((task) => (
		<tr key={task.id} className="bg-white-100 text-black rounded-md border border-dashed shadow-md font-mono">
		  <td className="p-2 border-dashed border-2 hover:border-black hover:border-solid hover:bg-cyan-50">
			{task.title}
		  </td>
		  <td className="p-2 border-dashed border-2 hover:border-black hover:border-solid hover:bg-cyan-50">
			{task.description}
		  </td>
		  <td className="p-2 border-dashed border-2 hover:border-black hover:border-solid hover:bg-cyan-50">
			{task.dueDate}
		  </td>
		  <td className="p-2 border-dashed border-2 hover:border-black hover:border-solid hover:bg-cyan-50">
			{task.priority}
		  </td>
		  <td className="p-2 border-dashed border-2 hover:border-black hover:border-solid hover:bg-cyan-50">
			{task.status}
		  </td>
		  <td className="p-2 border-dashed border-2 hover:border-black hover:border-solid hover:bg-cyan-50">
			<button
			  className="border-black border-2 bg-cyan-100 p-1 hover:bg-cyan-300"
			  onClick={() => updateStatus(task)}
			>
			  {task.status === status[1] ? <p> Mark as Incomplete </p> : <p> Mark as Completed </p>}
			</button>
		  </td>
		  <td className="p-2 hover:bg-cyan-50">
			<button
			  onClick={() => toggleEditForm(task)}
			  className="bg-cyan-200 border-2 border-slate-800 rounded-lg shadow-md p-1 hover:bg-cyan-500 hover:text-white hover:shadow-xl"
			>
			  Edit
			</button>
			<button
			  className="bg-cyan-200 border-2 border-slate-800 rounded-lg shadow-md p-1 hover:bg-cyan-500 hover:text-white hover:shadow-xl"
			  onClick={() => deleteLocalTask(task.id)}
			>
			  Delete
			</button>
			{showEditForm && selectedTask && (
			  <EditTaskForm
				task={selectedTask}
				onEditTask={handleEditTask}
				onClose={() => setShowEditForm(false)}
			  />
			)}
		  </td>
		</tr>
	  ))}
	</tbody>
  </table>
  

  );
};

export default TaskTable;
