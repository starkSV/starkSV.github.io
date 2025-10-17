import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAV = [
  { id: "home", label: "Home", path: "/" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "contact", label: "Contact", path: "/#contact" },
];

export default function Header({ logo = "/assets/logo.jpg", resumeHref = "#" }) {
  const wrapperRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // layout params
  const basePct = 10;
  const addPct = 5;
  const heightStart = 4.5; // rem
  const heightShrink = 1; // rem

  // utility
  const isClient = typeof window !== "undefined";

  // memoized CSS variables setter
  const setVars = useCallback((sidePct, hdrRem) => {
    if (!isClient) return;
    const root = document.documentElement;
    root?.style.setProperty("--side-pct", `${sidePct}%`);
    root?.style.setProperty("--hdr-h", `${hdrRem}rem`);
  }, [isClient]);

  // memoized styles
  const headerStyles = useMemo(() => ({
    left: `var(--side-pct, ${basePct}%)`,
    right: `var(--side-pct, ${basePct}%)`,
    height: `var(--hdr-h, ${heightStart}rem)`,
  }), [basePct, heightStart]);

  const mobileMenuStyles = useMemo(() => ({
    left: `var(--side-pct, ${basePct}%)`,
    right: `var(--side-pct, ${basePct}%)`,
    top: `calc(3% + var(--hdr-h, ${heightStart}rem) + 0.5rem)`,
  }), [basePct, heightStart]);

  // initialize CSS vars
  useEffect(() => {
    if (!isClient) return;
    setVars(basePct, heightStart);
  }, [setVars, basePct, heightStart]);

  // optimized scroll handler
  const onScroll = useCallback(() => {
    if (!isClient) return;
    const isScrolled = window.scrollY > 80;
    setScrolled(isScrolled);
    const sidePct = isScrolled ? basePct + addPct : basePct;
    const hdrRem = isScrolled ? heightStart - heightShrink : heightStart;
    setVars(sidePct, hdrRem);
  }, [isClient, basePct, addPct, heightStart, heightShrink, setVars]);

  useEffect(() => {
    if (!isClient) return;
    
    onScroll(); // initial call
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll, isClient]);

  // handle mobile menu body scroll lock
  useEffect(() => {
    if (!isClient) return;
    
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isClient]);

  // handle escape key for mobile menu
  useEffect(() => {
    if (!isClient) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, isClient]);

  // Enhanced navigation handler for React Router
  const handleLinkClick = useCallback((e, item) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setOpen(false);

    if (!isClient) return;

    // Handle different navigation types
    if (item.id === "contact") {
      // If we're not on homepage, go to homepage first then scroll to contact
      if (location.pathname !== "/") {
        navigate("/");
        // Small delay to ensure page loads before scrolling
        setTimeout(() => {
          const element = document.getElementById("contact");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        // If already on homepage, just scroll to contact
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      // For other routes, use React Router navigation
      navigate(item.path);
      
      // If navigating to home, scroll to top
      if (item.path === "/") {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    }
  }, [isClient, location.pathname, navigate]);

  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // Check if current path matches nav item
  const isActiveLink = useCallback((item) => {
    if (item.id === "contact") {
      return false; // Contact is not a separate page, so never "active"
    }
    return location.pathname === item.path;
  }, [location.pathname]);

  return (
    <>
      <header
        ref={wrapperRef}
        role="banner"
        aria-label="Site header"
        className="fixed pointer-events-auto top-[3%] z-[1000] transition-all duration-300"
        style={headerStyles}
      >
        <div
          className="w-full h-full flex items-center justify-between px-6 md:px-8 text-white shadow-lg rounded-[1rem] border border-white/5"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(15,17,18,0.96), rgba(30,32,35,0.88))",
            backdropFilter: "blur(8px) saturate(120%)",
          }}
        >
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-1 hover:opacity-90 transition-opacity"
              aria-label="Go to home"
            >
              <img 
                src={logo} 
                alt="Shekhar Vaidya logo" 
                className="h-10 w-10 rounded-full object-cover hidden sm:block"
                loading="eager"
                decoding="async"
              />
              <span className="font-semibold text-xl select-none">Shekhar Vaidya</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6" role="navigation">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-2 py-1 ${
                    isActiveLink(item)
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm border border-white/10 rounded text-gray-200 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Resume
              </a>
            </nav>

            <div className="flex items-center md:hidden gap-2">
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={toggleMenu}
                className="p-2 rounded border border-white/10 text-gray-200 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                {open ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="md:hidden fixed z-50"
            style={mobileMenuStyles}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div
              className="px-4 py-3 flex flex-col gap-2 rounded-b-lg border border-white/5 shadow-lg"
              style={{ backgroundColor: "rgba(15,17,18,0.98)" }}
            >
              <nav role="navigation">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`w-full text-left py-2 px-2 rounded transition focus:outline-none focus:ring-2 focus:ring-white/20 ${
                      isActiveLink(item)
                        ? 'text-blue-400 bg-blue-400/10 font-medium'
                        : 'text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 py-2 px-2 border border-white/10 rounded text-gray-200 text-center hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer uses CSS variable fallback */}
      <div 
        aria-hidden="true" 
        style={{ height: `calc(var(--hdr-h, ${heightStart}rem) + 1.5rem)` }} 
      />
    </>
  );
}