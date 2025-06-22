import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewItems from './Pages/ViewItems';
import AddItem from './Pages/AddItem';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
  );
};

export default App;