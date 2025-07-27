// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/homepage';
import BlogPage from './subcomponents/BlogPage';
import BlogList from './subcomponents/BlogList';
import ProjectList from './subcomponents/ProjectList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/blog-list" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}
