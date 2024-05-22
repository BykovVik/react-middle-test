import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';

const App = () => (
  <div className="container">
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/edit/:id" element={<EmployeeEdit />} />
    </Routes>
  </div>
);

export default App;
