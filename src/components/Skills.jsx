// src/components/Skills.jsx

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const logos = [
  {
    key: 'web',
    label: 'Web Development',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    alt: 'HTML5 Logo',
  },
  {
    key: 'mobile',
    label: 'Mobile App Development',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    alt: 'Flutter Logo',
  },
  {
    key: 'desktop',
    label: 'Desktop Applications',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
    alt: 'Electron Logo',
  },
  {
    key: 'uiux',
    label: 'UI/UX Design',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    alt: 'Figma Logo',
  },
  {
    key: 'ai',
    label: 'Artificial Intelligence',
    src: 'https://cdn.simpleicons.org/openai',
    alt: 'OpenAI Logo',
  },
  {
    key: 'ml',
    label: 'Machine Learning',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    alt: 'Scikit‑learn Logo',
  },
  {
    key: 'data',
    label: 'Data Science',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    alt: 'Pandas Logo',
  },
  {
    key: 'blockchain',
    label: 'Blockchain',
    src: 'https://cdn.simpleicons.org/ethereum',
    alt: 'Ethereum Logo',
  },
  {
    key: 'qa',
    label: 'Testing & QA',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg',
    alt: 'Selenium Logo',
  },
  {
    key: 'devops',
    label: 'DevOps & CI/CD',
    // Docker logo via Simple Icons CDN (widely recognized DevOps symbol)
    src: 'https://cdn.simpleicons.org/docker',
    alt: 'Docker Logo',
  },
]

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const section = document.getElementById('skills')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <section
      id="skills"
      className="snap-start py-20 lg:py-32 scroll-snap-section bg-secondary/5"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <AnimatePresence>
          {isVisible && (
            <>
              {/* Header */}
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
              >
                <h2 className="text-4xl font-bold mb-4">
                  Skills & <span className="gradient-text">Expertise</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 rounded-full" />
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Domains I work in
                </p>
              </motion.div>

              {/* Logo Grid */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-12 justify-items-center"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={1}
              >
                {logos.map((logo, i) => (
                  <motion.div
                    key={logo.key}
                    className="flex flex-col items-center transform transition hover:scale-110"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={i + 2}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="mt-2 text-sm font-medium text-center">
                      {logo.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills
