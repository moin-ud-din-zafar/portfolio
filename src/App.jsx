// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage    from './pages/homepage';
import BlogPage    from './subcomponents/BlogPage';
import BlogList    from './subcomponents/BlogList';
import ProjectList from './subcomponents/ProjectList';

export default function App() {
  return (
    <Routes>
      {/* matches "/portfolio/" */}
      <Route index element={<Homepage />} />

      {/* matches "/portfolio/project-list" */}
      <Route path="project-list" element={<ProjectList />} />

      {/* matches "/portfolio/blog-list" */}
      <Route path="blog-list" element={<BlogList />} />

      {/* matches "/portfolio/blog/:id" */}
      <Route path="blog/:id" element={<BlogPage />} />

      {/* catch‑all: 404 under /portfolio/* */}
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}
