import React, { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    );
    const section = document.getElementById('about');
    if (section) obs.observe(section);
    return () => obs.disconnect();
  }, []);

  const codeContent = `const yourName = {
  role: "Senior Software Engineer",
  location: "San Francisco, CA",
  languages: ["TypeScript", "Python", "Rust"],
  focus: ["Web3", "AI/ML", "Dev Tools"],
  currentlyBuilding: "Next-gen dev platform",
  openToOpportunities: true,
  passions: ["Open Source", "Developer Experience", "System Architecture"],
  recentAchievements: ["Led team of 8 engineers", "Built platform serving 1M+ users", "Speaker at 5+ conferences"]
};`;

  const stats = [
    { num: '8+', label: 'Years Experience' },
    { num: '50+', label: 'Projects Built' },
    { num: '1M+', label: 'Users Impacted' },
  ];

  return (
    <section
      id="about"
      className="snap-start py-16 sm:py-20 lg:py-32 scroll-snap-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`
            grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center
            max-w-4xl sm:max-w-5xl lg:max-w-7xl mx-auto
            transition-opacity duration-1000
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Text Column */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                I'm a passionate software engineer with over 8 years of experience building scalable web
                applications and leading engineering teams. I love turning complex problems into simple,
                beautiful solutions.
              </p>
              <p>
                Currently, I'm focused on building developer tools that make engineers more productive and
                happy. When I'm not coding, you'll find me contributing to open source projects, mentoring
                junior developers, or exploring the latest in AI and Web3 technologies.
              </p>
              <p>
                I believe in writing clean, maintainable code and creating inclusive, collaborative
                engineering cultures where everyone can thrive.
              </p>
            </div>

            {/* Stats: grid on mobile, flex on sm+ */}
            <div className="grid grid-cols-2 gap-3 pt-4 sm:flex sm:flex-wrap sm:gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`
                    glass-morphism px-3 sm:px-4 py-2 rounded-lg text-center
                    ${idx === 2 ? 'col-span-2 sm:col-auto' : ''}
                  `}
                >
                  <div className="text-xl sm:text-2xl font-bold text-primary">{stat.num}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Window Column */}
          <div
            className={`
              relative transition-opacity duration-1000 delay-200
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="glass-morphism rounded-lg overflow-hidden border border-border/50">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-secondary/30 border-b border-border/50">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                  ~ /your-name/about.ts
                </div>
                <div className="w-12 sm:w-16"></div>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-card/50">
                <pre className="whitespace-pre-wrap overflow-x-auto">
                  {codeContent}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
