import { useState } from 'react';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import TaskTable from './components/tasktable';
import './App.css'

function App() {
  return (
    <>
     <div>
      <Navbar />
      <TaskTable />
      </div>
    </>
  )
}

export default App;
