import React from 'react';
import Form from './components/Form';
import Search from './components/Search';
import Table from './components/Table';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  
  return (
    <div className="app-container">
      <h1>Product Inventory Manager</h1>
      <Form />
      <Search />
      <Table />
    </div>
  );
};

export default App;