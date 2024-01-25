/* deletes the task in localStorage */

const DeleteTask = ({taskID, task}) => {

    const DeleteLocalTask = () => {
        console.log("i was deleted, oh no");
        localStorage.removeItem(taskID);
        console.log(localStorage.getItem(taskID));
    }
    return(
        <div>
            <button className="bg-cyan-200 border-2 border-slate-800 
            rounded-lg shadow-md p-1 hover:bg-cyan-500 hover:text-white
            hover:shadow-xl" onClick={DeleteLocalTask}>
                Delete
            </button>
        </div>
    );
}

export default DeleteTask;