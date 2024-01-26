import React, { useState } from 'react';

const SearchBar = ({tasksObject}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCompleted, setFilterCompleted] = useState('All');

  const closePopup = () => {
    setShowResults(false);
  };

  const performSearch = () => {

    const result = [];
    console.log("tasksObject", tasksObject);

    /* run the query on complete data */
    tasksObject.map(task => {
        (task.title.includes(searchQuery) || task.description.includes(searchQuery)) ? result.push(task) : task
    });
    console.log("result is ", result);

    const mockSearchResults = [
        { id: 1, task: "Task 1", priority: "high", completed: false },
        { id: 2, task: "Task 2", priority: "Medium", completed: true },
        { id: 3, task: "Task 3", priority: "low", completed: false },
      ];

    let filteredResults = result;
    console.log("filterPriority is", filterPriority);
    
    if (filterPriority !== 'All') {
      filteredResults = filteredResults.filter(result => result.priority == filterPriority);
    }

    if (filterCompleted == 'Completed') {
        filteredResults = filteredResults.filter(result => result.status === "COMPLETED");
    }

    if (filterCompleted == 'Incomplete') {
        filteredResults = filteredResults.filter(result => result.status !== "COMPLETED");
    }

    console.log("filteredResults is ", filteredResults);

    // Update state with filtered search results
    setSearchResults(filteredResults);
    // Show the results popup
    setShowResults(true);
    setSearchQuery('');
  };

  return (
    <div className='flex flex-row p-2 m-2 items-center'>
      {/* Search Bar and Button */}
      <input
        type="text"
        id="searchInput"
        placeholder="Enter your search"
        className='p-2 m-2 border-2 border-black hover:shadow-xl rounded-md'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={performSearch} className="bg-cyan-200 border-2 border-slate-800 rounded-lg shadow-md p-2 
      hover:bg-cyan-500 hover:text-white hover:shadow-xl"
	   >Search</button>

      {/* Filter Dropdowns */}
      <label className='p-2'>Priority:</label>
      <select className='p-2 bg-cyan-50 border-2 border-black rounded-md hover:shadow-xl' value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
        <option value="All">All</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>

      <label className='p-2'>Completion Status:</label>
      <select  className='p-2 bg-cyan-50 border-2 border-black rounded-md hover:shadow-xl' value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Incomplete">Incomplete</option>
      </select>

      {/* Search Results Popup */}
      {showResults && (
        <div className="flex flex-col shadow-xl rounded-md p-2 bg-cyan-50 absolute p-2
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
          <h2 className='font-mono'>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
            <li className='flex-1 font-mono text-cyan-700 border-2 p-2 border-black shadow-md bg-white m-1 hover:bg-cyan-200
            hover:shadow-xl' key={index}> 
             <b> {result.title} </b> <br /> {result.description} <br /> {result.dueDate}
             <br /> {result.completed ? 'Completed' : 'Incomplete'} <br />
             </li>
            ))}
            <button className='border-2 border-black p-2 m-1 text-white text-bold bg-slate-700 rounded-lg shadow-sm' 
            onClick={closePopup} style={{ marginLeft: '10px' }}> X </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
