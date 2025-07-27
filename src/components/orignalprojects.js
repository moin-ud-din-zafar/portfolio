// src/components/Projects.jsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../api/portfolioApi';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [projects,  setProjects]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  // 1) Observer to trigger fade when scrolling into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const section = document.getElementById('projects');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 2) Fetch projects and reveal on data-load
  useEffect(() => {
    api.getAllProjects()
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Expected an array');
        setProjects(data);
      })
      .catch(err => setError(err.message))
      .finally(() => {
        setLoading(false);
        setIsVisible(true); // reveal immediately once data arrives
      });
  }, []);

  // Loading / error / empty states
  if (loading || error || !projects.length) {
    const msg = loading
      ? 'Loading projects…'
      : error
        ? `Error: ${error}`
        : 'No projects to display.';
    return (
      <section
        id="projects"
        className={`snap-start py-20 lg:py-32 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto text-center">
          <p className={error ? 'text-red-500' : 'text-gray-500'}>{msg}</p>
        </div>
      </section>
    );
  }

  // Split featured vs other
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects    = projects.filter(p => !p.featured);

  return (
    <>
      {/* === bring back your keyframes + fade-in logic === */}
      <style>{`
        /* container fade-in */
        @keyframes fadeInContainer {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* child slide-up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* start hidden */
        #projects { visibility: hidden; }
        .child    { opacity: 0; }

        /* play animations once */
        #projects.fade-in {
          visibility: visible;
          animation: fadeInContainer 1.2s cubic-bezier(0.25,0.8,0.25,1) forwards;
        }
        #projects.fade-in .child {
          animation: fadeUp 1s cubic-bezier(0.25,0.8,0.25,1) forwards;
        }

        /* stagger via delay */
        .fade-delay-0 { animation-delay: 0.2s; }
        .fade-delay-1 { animation-delay: 0.3s; }
        .fade-delay-2 { animation-delay: 0.4s; }
        .fade-delay-3 { animation-delay: 0.5s; }
        .fade-delay-4 { animation-delay: 0.6s; }
        .fade-delay-5 { animation-delay: 0.7s; }
        .fade-delay-6 { animation-delay: 0.8s; }
        .fade-delay-7 { animation-delay: 0.9s; }
      `}</style>

      <section
        id="projects"
        className={`snap-start py-20 lg:py-32 scroll-snap-section ${
          isVisible ? 'fade-in' : ''
        }`}
      >
        <style>{`
          /* Glass-morphism card footer (unchanged) */
          .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
          }
          .card-footer .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .card-footer .icons a {
            background: rgba(255,255,255,0.9);
            padding: 0.5rem;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
          }
          .card-footer .icons a:hover {
            transform: scale(1.1);
          }
        `}</style>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 child fade-delay-0">
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
                className={`
                  grid lg:grid-cols-2 gap-8 lg:gap-12 items-center
                  child fade-delay-${i + 1}
                  ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}
                `}
              >
                {/* Image */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''} relative group`}>
                  <div className="glass-morphism rounded-xl overflow-hidden transform
                                  group-hover:scale-105 transition-all duration-300
                                  group-hover:shadow-2xl relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                    flex items-end justify-center pb-6">
                      <div className="flex gap-4">
                        <a
                          href={project.demoUrl}
                          className="px-4 py-2 bg-primary text-primary-foreground
                                     rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.codeUrl}
                          className="px-4 py-2 bg-white/90 text-black
                                     rounded-lg font-medium hover:bg-white transition-colors"
                        >
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info + Stats + Footer */}
                <div className={`space-y-6 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
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
                  <div className="card-footer">
                    <div className="tags">
                      {(project.tags || []).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary/80 text-secondary-foreground
                                     rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="icons flex gap-2">
                      <a href={project.codeUrl} aria-label="View Code"><FaGithub /></a>
                      <a href={project.demoUrl} aria-label="Live Preview"><FaEye /></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Notable Projects */}
          <div className="child fade-delay-7">
            <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
              Other Notable Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, idx) => (
                <div
                  key={project._id || project.id}
                  className="glass-morphism rounded-xl overflow-hidden group
                             hover:scale-105 transition-all duration-300 hover:shadow-xl
                             flex flex-col child"
                  style={{ animationDelay: `${0.8 + idx * 0.1}s` }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                  flex items-center justify-center">
                    <div className="flex gap-3">
                      <a
                        href={project.demoUrl}
                        className="px-3 py-1 bg-primary text-primary-foreground
                                   rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Demo
                      </a>
                      <a
                        href={project.codeUrl}
                        className="px-3 py-1 bg-white/90 text-black
                                   rounded text-sm font-medium hover:bg-white transition-colors"
                      >
                        Code
                      </a>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>
                    <div className="card-footer">
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
                      <div className="icons flex gap-2">
                        <a href={project.codeUrl} aria-label="View Code"><FaGithub /></a>
                        <a href={project.demoUrl} aria-label="Live Preview"><FaEye /></a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View More Projects */}
          <div className="mt-16 text-center child fade-delay-7">
            <Link
              to="/project-list"
              className="inline-flex items-center gap-2 px-6 py-3
                         bg-gradient-to-r from-blue-500 to-purple-600 text-white
                         font-medium rounded-full hover:opacity-90 transition"
            >
              View More Projects <FaEye />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
