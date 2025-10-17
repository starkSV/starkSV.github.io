import React, { useState, useCallback, useMemo } from "react";

const PROJECTS = [
  {
    id: "pixlyzer",
    title: "Pixlyzer",
    desc: "Image toolkit for conversion, compression, resizing and batch operations. React frontend + Python backend.",
    image: "/assets/pixlyzer-banner.jpg",
    tags: ["React", "Tailwind CSS", "Python"],
    github: "https://github.com/starkSV/pixlyzer",
    demo: "https://pixlyzer.tech-latest.com/",
    category: "Tool"
  },
  {
    id: "bottleneck-calculator",
    title: "Bottleneck Calculator",
    desc: "Free tool to identify CPU/GPU bottlenecks across 1080p/1440p/4K and suggest upgrades.",
    image: "/assets/bottleneck-banner.jpg",
    tags: ["React", "Tailwind CSS", "Python", "Data", "Charts"],
    github: "https://github.com/starkSV/bottleneck-calculator",
    demo: "https://bottleneck.tech-latest.com/",
    category: "Calculator"
  },
  {
    id: "msdl",
    title: "MSDL",
    desc: "Access official, up-to-date, and legacy versions of Microsoft Windows directly. Fast, free, and no registration required.",
    image: "/assets/msdl-banner.jpg",
    tags: ["React", "Tailwind CSS"],
    github: "https://github.com/starkSV/msdl",
    demo: "https://msdl.tech-latest.com/",
    category: "Resource"
  },
];

// Image component with loading states
const ProjectImage = ({ src, alt, projectId, primaryTag }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-white/5 to-white/2">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-2 mx-auto">
              <span className="text-2xl font-bold text-white">{alt.charAt(0)}</span>
            </div>
            <p className="text-xs text-gray-400">{alt}</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!error && (
        <img
          src={src}
          alt={`${alt} project screenshot`}
          className={`w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Primary tag overlay */}
      <div className="absolute top-3 right-3">
        <span className="text-xs px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-gray-200 font-medium shadow-lg">
          {primaryTag}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

// Tag component
const Tag = ({ children, index }) => (
  <span 
    className="inline-block text-xs px-3 py-1.5 mr-2 mb-2 rounded-full bg-white/8 text-gray-300 border border-white/10 hover:bg-white/12 transition-colors"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {children}
  </span>
);

// Project card component
const ProjectCard = ({ project, index }) => {
  return (
    <article
      className="group bg-[#0f1011] border border-white/8 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:border-white/15 flex flex-col"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <ProjectImage
        src={project.image}
        alt={project.title}
        projectId={project.id}
        primaryTag={project.tags[0]}
      />

      <div className="p-6 lg:p-8 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {project.title}
            </h3>
            {project.category && (
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md ml-2 flex-shrink-0">
                {project.category}
              </span>
            )}
          </div>
          
          <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-6">
            {project.desc}
          </p>

          <div className="mb-6">
            {project.tags.map((tag, tagIndex) => (
              <Tag key={tag} index={tagIndex}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-800/50 border border-white/10 text-sm text-gray-200 hover:bg-gray-700/50 hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-blue-500/25"
            aria-label={`View ${project.title} live demo`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
};

export default function FeaturedProjects() {
  // Memoize processed projects
  const processedProjects = useMemo(() => PROJECTS, []);

  return (
    <section 
      id="projects" 
      className="py-20 lg:py-28"
      role="region"
      aria-labelledby="projects-heading"
    >
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="w-full px-6 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <header className="text-center mb-16">
            <h2 
              id="projects-heading" 
              className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-4"
            >
              Featured Projects
            </h2>
            <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A selection of my recent work. Each project is unique and solves specific problems.
            </p>
          </header>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {processedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Projects CTA */}
      <footer className="mt-16 text-center">
        <a 
          href="/projects" 
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="View all projects page"
        >
          View All Projects
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </footer>
    </section>
  );
}