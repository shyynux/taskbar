/* stores the task in localStorage */

import { useState } from "react";

const taskID = 1;

// task = {
//     title: 'Complete Taskbar',
//     description: 'Create a task management webapp',
//     dueDate: '2024-01-26',
//     priority: 'high',
//     completed: false,
// }

const AddTask = ({task}) => {

    const addtoLocal = () => {
        localStorage.setItem(taskID, task);
        console.log("taskId and task", taskID);
        console.log(task);
        console.log("i was clicked");
        const testvar = localStorage.getItem(taskID);
        var lem = testvar.valueOf;
        console.log(lem);
    }
    return(
        <div>
            <button className="bg-cyan-200 border-solid shadow-md p-2" onClick={addtoLocal}>
                Add
            </button>
        </div>
    );
}

export default AddTask;