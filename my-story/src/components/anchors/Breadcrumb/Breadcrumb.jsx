import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomBreadcrumb from "./CustomBreadcrumb";

const Breadcrumb = () => {
  return (
    <Router>
      <div>
        <CustomBreadcrumb />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/products/laptops" element={<h1>Laptops</h1>} />
          <Route path="/services" element={<h1>Services</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/extra-info" element={<h1>Extra Info</h1>} />
          <Route path="/help" element={<h1>Help Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Breadcrumb;