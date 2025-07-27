// src/pages/homepage.jsx
import React from 'react';
import Navbar   from '../components/Navbar';
import Hero     from '../components/Hero';
import About    from '../components/About';
import Skills   from '../components/Skills';
import Projects from '../components/Projects';
import Blog     from '../components/Blog';
import Contact  from '../components/Contact';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </div>
  );
}
