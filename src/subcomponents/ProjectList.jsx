// src/subcomponents/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import { FaGithub, FaEye } from 'react-icons/fa';
import api from '../api/portfolioApi';
import { Link } from 'react-router-dom';

export default function ProjectList() {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    api.getAllProjects()
      .then(data => setProjects(data))
      .catch(err => {
        console.error('Failed to fetch all projects:', err);
        setError(err.message || 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center">Loading projects…</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  if (projects.length === 0) {
    return <p className="text-center text-gray-500">No projects found.</p>;
  }

  return (
    <>
      <style>{`
        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
        .card-footer .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .card-footer .icons a { background: rgba(255,255,255,0.9); padding: 0.5rem; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; transition: transform 0.2s; }
        .card-footer .icons a:hover { transform: scale(1.1); }
      `}</style>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">
              All <span className="text-indigo-500">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-500 rounded-full mx-auto mb-4" />
            <p className="text-lg text-gray-600">Explore all projects and showcases</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p._id || p.id} className="relative glass-morphism rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-xl flex flex-col">
                <div className="relative">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <a href={p.demoUrl} className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors">Demo</a>
                      <a href={p.codeUrl} className="px-3 py-1 bg-white/90 text-black rounded text-sm font-medium hover:bg-white transition-colors">Code</a>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
                  </div>
                  <div className="card-footer">
                    <div className="tags">
                      {(p.tags || []).map(t => (
                        <span key={t} className="px-2 py-1 bg-secondary/60 text-secondary-foreground rounded text-xs font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="icons">
                      <a href={p.codeUrl} aria-label="View Code"><FaGithub /></a>
                      <a href={p.demoUrl} aria-label="Live Preview"><FaEye /></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
