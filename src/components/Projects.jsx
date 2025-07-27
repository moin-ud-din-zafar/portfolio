// src/components/Projects.jsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../api/portfolioApi';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects on mount
  useEffect(() => {
    api.getAllProjects()
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Expected an array');
        setProjects(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Animate each element with class 'child' when it enters viewport
  useEffect(() => {
    if (loading) return;
    const elems = document.querySelectorAll('#projects .child');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elems.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Loading / error / empty states
  if (loading || error || !projects.length) {
    const msg = loading
      ? 'Loading projects…'
      : error
      ? `Error: ${error}`
      : 'No projects to display.';
    return (
      <section id="projects" className="snap-start py-20 lg:py-32">
        <div className="container mx-auto text-center">
          <p className={error ? 'text-red-500' : 'text-gray-500'}>{msg}</p>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="snap-start py-20 lg:py-32 scroll-snap-section">
      {/* Animation Styles */}
      <style>{`
        .child {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .child.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 child">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and contributions to the developer community
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-20">
          {featuredProjects.map((project, i) => (
            <div
              key={project._id || project.id}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center child"
            >
              {/* Image */}
              <div className="relative  group">
                <div className="glass-morphism rounded-xl overflow-hidden transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-2xl relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-4">
                      <a
                        href={project.demoUrl}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.codeUrl}
                        className="px-4 py-2 bg-white/90 text-black rounded-lg font-medium hover:bg-white transition-colors"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info & Stats */}
              <div className="space-y-6 child">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">{project.stats.users}</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{project.stats.performance}</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{project.stats.rating}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
                <div className="card-footer relative pb-6 child">
                  <div className="tags">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary/80 text-secondary-foreground
                                     rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="icons absolute bottom-2 right-2 flex gap-2">
                    <a href={project.codeUrl}><FaGithub/></a>
                    <a href={project.demoUrl}><FaEye/></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Notable Projects Header */}
        <div className="text-center mb-8 child">
          <h3 className="text-2xl lg:text-3xl font-bold">Other Notable Projects</h3>
        </div>

        {/* Other Notable Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <div
              key={project._id || project.id}
              className="glass-morphism rounded-xl overflow-hidden group flex flex-col child"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-3">
                  <a href={project.demoUrl} className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors">Demo</a>
                  <a href={project.codeUrl} className="px-3 py-1 bg-white/90 text-black rounded text-sm font-medium hover:bg-white transition-colors">Code</a>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between h-full child">
                <div>
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                </div>
                <div className="card-footer relative pb-6 ">
                  <div className="tags flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary/60 text-secondary-foreground
                                       rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-secondary/60 text-secondary-foreground
                                     rounded text-xs font-medium">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="icons absolute bottom-2 right-2 flex gap-2">
                    <a href={project.codeUrl}><FaGithub/></a>
                    <a href={project.demoUrl}><FaEye/></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="mt-16 text-center child">
          <Link
            to="/project-list"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition"
          >
            View More Projects <FaEye />
          </Link>
        </div>
      </div>
    </section>
  );
}