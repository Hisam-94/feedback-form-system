import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import FormEditor from "../components/FormEditor";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/edit/:id" element={<FormEditor/>} />      
    </Routes>
  );
};

export default AllRoutes;
