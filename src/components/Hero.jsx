import React, { useState, useCallback } from "react";

export default function Hero({
  id = "hero",
  name = "Shekhar Vaidya",
  title = "Blogger. Tech Writer. Builder.",
  ctaWorkHref = "#projects",
  ctaContactHref = "#contact",
  image = "/assets/hero-photo.jpg",
  resumeHref = "/assets/ShekharResume.pdf",
}) {
  const [imageError, setImageError] = useState(false);

  // Smooth scroll handler for internal links
  const handleCtaClick = useCallback((e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
  }, []);

  // CTA button configuration
  const ctaButtons = [
    {
      href: ctaWorkHref,
      label: "View Projects",
      primary: true,
      className: "inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
    },
    {
      href: ctaContactHref,
      label: "Contact",
      primary: false,
      className: "inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-sm text-gray-300 hover:bg-white/5 hover:border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900"
    }
  ];

  return (
    <section 
      id={id} 
      className="pt-8 md:pt-12 lg:pt-16" 
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: text content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-widest text-blue-400 font-medium">
                Hi, I'm {name}
              </p>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-extrabold leading-[1.1]"
                style={{ textWrap: "balance" }}
              >
                {title}
              </h1>

              <p className="max-w-2xl text-lg text-gray-300 leading-relaxed">
                I write about tech, build small web tools (React, Tailwind, Python backends), and publish guides for Windows and Gaming enthusiasts.
                I also run TechLatest and eSportsLatest.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                {ctaButtons.map((button) => (
                  <a
                    key={button.label}
                    href={button.href}
                    onClick={(e) => handleCtaClick(e, button.href)}
                    className={button.className}
                    aria-label={`${button.label} - ${button.primary ? 'Primary action' : 'Secondary action'}`}
                  >
                    {button.label}
                  </a>
                ))}
              </div>

              {/* Additional Links */}
              <div className="flex items-center gap-6 pt-2">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:text-gray-200"
                  aria-label="Download resume (opens in new tab)"
                >
                  Resume ↗
                </a>
              </div>

              {/* Location & Status */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
                  <small className="text-sm text-gray-400">
                    Based in India · Open to freelance and collaboration
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Right: image */}
          {image && !imageError && (
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="w-full max-w-sm lg:max-w-md">
                <div className="relative group">
                  <img
                    src={image}
                    alt={`${name} - Portfolio hero image`}
                    className="w-full aspect-square sm:aspect-[4/5] rounded-2xl border border-white/10 shadow-2xl object-cover opacity-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                  
                  {/* Optional: Add a subtle overlay effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 lg:mt-20 flex justify-center">
          <a 
            href={ctaWorkHref}
            onClick={(e) => handleCtaClick(e, ctaWorkHref)}
            aria-label="Scroll to view projects"
            className="group text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:text-gray-200"
          >
            <svg 
              className="w-6 h-6 animate-bounce group-hover:animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}