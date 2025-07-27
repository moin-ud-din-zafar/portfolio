// src/components/Hero.jsx

import React, { useState, useEffect } from 'react'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Stats for mobile & desktop
  const stats = [
    { label: 'Repositories', value: 8 },
    { label: 'Stars',        value: 19298 },
    { label: 'Followers',    value: 18718 },
  ]

  const codeContent = `const yourName = {
  role: "Software Engineer",
  location: "Lahore, Pakistan",
  languages: ["JavaScript", "Python", "Java", "TypeScript", "C++"],
  focus: ["Web", "AI", "Machine Learning", "App", "Blockchain", "DevOps"],
  currentlyBuilding: "Sakoon Ai platform",
  openToOpportunities: true,
  passions: [
    "Open Source",
    "Developer Experience",
    "System Architecture"
  ],
  recentAchievements: [
    "Led team of 4 engineers",
    "Developing FYP project Sakoon AI",
    "Speaker at 2+ conferences"
  ]
};`

  // Typewriter phrases
  const phrases = [
    'Senior Software Engineer',
    'Open Source Contributor',
    'Tech Lead'
  ]

  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // speeds (ms)
  const TYPING_SPEED = 100
  const DELETING_SPEED = 50
  const PAUSE_AFTER = 1000

  useEffect(() => {
    const current = phrases[idx % phrases.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        TYPING_SPEED
      )
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        DELETING_SPEED
      )
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIdx(i => i + 1)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, idx])

  return (
    <>
      <style>{`
        .typewriter {
          display: inline-block;
          border-right: 2px solid currentColor;
          white-space: nowrap;
          animation: blink-caret .75s step-end infinite;
        }
        @keyframes blink-caret {
          0%,100% { border-color: transparent; }
          50% { border-color: currentColor; }
        }

        /* glowing badge animation */
        @keyframes glow {
          0%,100% {
            background-color: rgba(4, 120, 87, 0.1);
            box-shadow: none;
          }
          50% {
            background-color: rgba(4, 120, 87, 0.4);
            box-shadow: 0 0 8px rgba(4, 120, 87, 0.7);
          }
        }
        .blink-light {
          animation: glow 2s ease-in-out infinite;
        }

        /* BUTTON & LINK HOVER BORDER */
        button,
        a[download] {
          cursor: default;
          border: 2px solid transparent;
        }
        button:hover,
        a[download]:hover {
          border-color: currentColor;
        }
      `}</style>

      <section
        id="hero"
        className="snap-start min-h-screen flex items-center justify-center relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* MOBILE/TABLET (<lg) */}
          <div className="flex flex-col items-center text-center lg:hidden space-y-4 pt-8 pb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-500/20 rounded-full text-green-600 blink-light">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
              <span className="text-sm font-medium">
                Available for new opportunities
              </span>
            </div>
            <h1 className="text-2xl font-bold mt-15">
              Hi, I’m <span className="gradient-text">Moin ud din</span>
            </h1>
            <p className="text-base text-muted-foreground mt-5">
              <span className="typewriter">{text}</span>
            </p>

            <div className="w-full flex justify-around mt-10">
              {stats.map(s => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="text-lg font-bold">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="w-full flex gap-4 px-4 mt-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Get in Touch
              </button>
              <a
                href="/resume.pdf"
                download
                className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition text-center"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* DESKTOP/TABLET (lg+) */}
          <div className="hidden lg:flex lg:items-center lg:justify-center min-h-screen">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-500/20 rounded-full text-green-600 blink-light">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
                  <span className="text-sm font-medium">
                    Available for new opportunities
                  </span>
                </div>
                <h1 className="text-5xl font-bold leading-tight">
                  Hi, I’m <span className="gradient-text">Moin ud din</span>
                </h1>
                <p className="text-2xl text-muted-foreground">
                  <span className="typewriter">{text}</span>
                </p>

                <div className="flex justify-start space-x-12 py-2">
                  {stats.map(s => (
                    <div key={s.label} className="flex flex-col items-start">
                      <span className="text-xl font-bold">{s.value}</span>
                      <span className="text-sm text-muted-foreground">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
                  >
                    Get in Touch
                  </button>
                  <a
                    href="/resume.pdf"
                    download
                    className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition text-center"
                  >
                    Download CV
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="glass-morphism rounded-lg overflow-hidden border border-border/50">
                  <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border/50">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-sm font-mono text-muted-foreground">
                      ~ /Moin ud din/about.ts
                    </div>
                    <div className="w-16" />
                  </div>
                  <div className="p-6 font-mono text-sm bg-card/50">
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                      {codeContent}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
