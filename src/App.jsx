import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedGradientBackground from './components/AnimatedGradientBackground';

// Lazy load components for better performance
const HomePage = lazy(() => import('./Pages/Home'));
const ProjectsPage = lazy(() => import('./Pages/Projects'));
const BlogPage = lazy(() => import('./Pages/Blog'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              An unexpected error occurred. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-6">
      <div className="text-8xl font-bold text-white mb-4">404</div>
      <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Go Home
        </a>
        <a
          href="/projects"
          className="px-6 py-3 border border-white/20 text-gray-300 hover:bg-white/5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          View Projects
        </a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/starkSV.github.io"> 
        <div className="min-h-screen text-white relative overflow-hidden">
          {/* Animated Background */}
          <AnimatedGradientBackground />
          
          {/* Header - Always visible */}
          <Header 
            logo="/assets/logo.jpg"
            resumeHref="/assets/ShekharResume.pdf"
          />

          {/* Main Content */}
          <main className="relative z-10">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer - Always visible */}
          <Footer 
            name="Shekhar Vaidya"
            email="shekhar@tech-latest.com"
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;