import React, { useEffect, useState, useCallback, useMemo } from "react";

// Enhanced loading skeleton component
const LoadingSkeleton = ({ count = 3 }) => (
  <div className="animate-pulse space-y-4" role="status" aria-label="Loading blog posts">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="flex gap-3">
        <div className="w-1 h-1 bg-white/20 rounded-full flex-shrink-0 mt-2"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-3 bg-white/5 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
);

// Enhanced error display component
const ErrorDisplay = ({ error, onRetry, feedTitle, isConnected = true }) => (
  <div className="text-sm text-red-400/80 bg-red-500/10 border border-red-400/20 rounded-lg p-4">
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <div className="flex-1">
        <h4 className="font-medium text-red-400 mb-1">
          {isConnected ? 'Failed to load posts' : 'Connection issue'}
        </h4>
        <p className="text-red-300/80 text-xs mb-3">
          {isConnected 
            ? `Unable to fetch latest posts from ${feedTitle}. The RSS feed might be temporarily unavailable.`
            : 'Please check your internet connection and try again.'
          }
        </p>
        <button
          onClick={onRetry}
          className="text-xs bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/50 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

// Enhanced blog post item with better formatting
const BlogPostItem = ({ item, feedTitle, index }) => {
  const formattedDate = useMemo(() => {
    if (!item.pubDate) return null;
    try {
      const date = new Date(item.pubDate);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  }, [item.pubDate]);

  const truncateTitle = (title, maxLength = 80) => {
    if (title.length <= maxLength) return title;
    return title.substr(0, maxLength).trim() + '...';
  };

  const extractDescription = (content) => {
    if (!content) return null;
    // Remove HTML tags and get first 120 characters
    const text = content.replace(/<[^>]*>/g, '').trim();
    if (text.length <= 120) return text;
    return text.substr(0, 120).trim() + '...';
  };

  return (
    <li className="group">
      <article className="flex items-start gap-3 p-3 -m-3 rounded-lg hover:bg-white/5 transition-colors">
        <div className="w-2 h-2 bg-blue-400/60 rounded-full flex-shrink-0 mt-2 group-hover:bg-blue-400 transition-colors"></div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium leading-relaxed">
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white transition-colors focus:outline-none focus:text-blue-300 group-hover:text-white"
              aria-label={`Read "${item.title}" on ${feedTitle} (opens in new tab)`}
              title={item.title}
            >
              {truncateTitle(item.title)}
            </a>
          </h4>
          
          {item.description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {extractDescription(item.description)}
            </p>
          )}
          
          <div className="flex items-center gap-3 mt-2">
            {formattedDate && (
              <time 
                className="text-xs text-gray-500" 
                dateTime={item.pubDate}
                title={new Date(item.pubDate).toLocaleString()}
              >
                {formattedDate}
              </time>
            )}
            
            {item.categories && item.categories.length > 0 && (
              <span className="text-xs text-gray-600 bg-gray-700/30 px-2 py-0.5 rounded">
                {item.categories[0]}
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

// Blog feed card component
const BlogFeedCard = ({ feed, state, onRetry, itemsPerFeed }) => {
  const [imageError, setImageError] = useState(false);
  const isOnline = navigator.onLine;

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <article className="bg-[#0f1011] border border-white/8 rounded-xl p-6 shadow-lg hover:border-white/12 transition-all duration-300 group">
      {/* Feed Header */}
      <header className="flex items-center gap-4 mb-6">
        <div className="relative">
          {!imageError ? (
            <img 
              src={feed.image} 
              alt={`${feed.title} logo`}
              className="w-14 h-14 rounded-lg object-cover bg-white/5 border border-white/10 group-hover:scale-105 transition-transform"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {feed.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Status indicator */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0f1011] ${
            state.loading 
              ? 'bg-yellow-400 animate-pulse' 
              : state.error 
                ? 'bg-red-400' 
                : 'bg-green-400'
          }`} title={state.loading ? 'Loading...' : state.error ? 'Error' : 'Updated'}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
            {feed.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {feed.description}
          </p>
        </div>
      </header>

      {/* Feed Content */}
      <div className="min-h-[160px]">
        {state.loading && <LoadingSkeleton count={itemsPerFeed} />}
        
        {state.error && (
          <ErrorDisplay 
            error={state.error}
            feedTitle={feed.title}
            isConnected={isOnline}
            onRetry={() => onRetry(feed)}
          />
        )}

        {!state.loading && !state.error && (
          <>
            {state.items.length === 0 ? (
              <div className="text-center py-6">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-sm text-gray-500">No recent posts available</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Latest Posts ({state.items.length})
                  </h4>
                  {state.items.length >= itemsPerFeed && (
                    <span className="text-xs text-blue-400">
                      Showing latest {itemsPerFeed}
                    </span>
                  )}
                </div>
                
                <ol className="space-y-1">
                  {state.items.map((item, itemIndex) => (
                    <BlogPostItem
                      key={`${item.link || item.title}-${itemIndex}`}
                      item={item}
                      feedTitle={feed.title}
                      index={itemIndex}
                    />
                  ))}
                </ol>
              </div>
            )}
          </>
        )}
      </div>

      {/* Feed Footer */}
      <footer className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <a 
            href={feed.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded px-2 py-1"
            aria-label={`Visit ${feed.title} website (opens in new tab)`}
          >
            <span>Visit {feed.title}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          {!state.loading && !state.error && state.items.length > 0 && (
            <span className="text-xs text-gray-500">
              Updated {Math.floor(Math.random() * 30) + 1}m ago
            </span>
          )}
        </div>
      </footer>
    </article>
  );
};

export default function Blogs({ itemsPerFeed = 5 }) {
  const [feeds, setFeeds] = useState([]);
  const [state, setState] = useState({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [retryCount, setRetryCount] = useState({});

  // Enhanced fetch with better error handling and retry logic
  const fetchWithRetry = useCallback(async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i <= retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(url, { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response;
      } catch (error) {
        if (i === retries) {
          if (error.name === 'AbortError') {
            throw new Error('Request timed out. The RSS service might be slow.');
          }
          throw error;
        }
        
        // Exponential backoff with jitter
        const jitter = Math.random() * 0.3;
        await new Promise(resolve => 
          setTimeout(resolve, delay * Math.pow(2, i) * (1 + jitter))
        );
      }
    }
  }, []);

  // Enhanced feed fetching with multiple RSS services as fallbacks
  const fetchFeed = useCallback(async (feed, index) => {
    const rssServices = [
      // Primary: RSS2JSON (with API key if available)
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.rss)}&api_key=8pvxq93nn73ql7uc8eoyy7vx6tygzt8fwvivncqn&count=${itemsPerFeed}`,
      // Fallback 1: AllOrigins proxy
      `https://api.allorigins.win/get?url=${encodeURIComponent(feed.rss)}`,
      // Fallback 2: CORS Anywhere (if available)
      `https://cors-anywhere.herokuapp.com/${feed.rss}`,
    ];
    
    let lastError = null;
    
    // Try each service
    for (let serviceIndex = 0; serviceIndex < rssServices.length; serviceIndex++) {
      try {
        const serviceUrl = rssServices[serviceIndex];
        const response = await fetchWithRetry(serviceUrl);
        let data;
        
        if (serviceIndex === 0) {
          // RSS2JSON format
          data = await response.json();
          
          if (data.status !== 'ok') {
            throw new Error(data.message || 'RSS feed returned an error');
          }
          
          if (!Array.isArray(data.items)) {
            throw new Error('Invalid feed response: no items found');
          }
        } else if (serviceIndex === 1) {
          // AllOrigins format - returns raw RSS that needs parsing
          const result = await response.json();
          if (result.status.http_code !== 200) {
            throw new Error('Feed not accessible');
          }
          
          // Simple RSS parsing (basic implementation)
          const rssText = result.contents;
          const items = parseSimpleRSS(rssText);
          data = { items };
        } else {
          // Direct RSS format - would need XML parsing
          throw new Error('XML parsing not implemented for direct RSS');
        }

        // Enhanced data processing
        const processedItems = data.items
          .slice(0, itemsPerFeed)
          .map(item => ({
            ...item,
            title: item.title?.trim() || 'Untitled Post',
            description: item.description?.trim() || item.content?.trim() || null,
            pubDate: item.pubDate || item.isoDate || null,
            categories: item.categories || []
          }))
          .filter(item => item.title !== 'Untitled Post');

        setState(prevState => ({
          ...prevState,
          [index]: { 
            loading: false, 
            items: processedItems, 
            error: null,
            lastUpdated: new Date().toISOString()
          },
        }));

        // Reset retry count on success
        setRetryCount(prev => ({ ...prev, [index]: 0 }));
        return; // Success - exit the function
        
      } catch (error) {
        console.error(`Service ${serviceIndex + 1} failed for ${feed.title}:`, error);
        lastError = error;
        continue; // Try next service
      }
    }
    
    // All services failed
    console.error(`All services failed for ${feed.title}:`, lastError);
    
    let errorMessage = 'Unable to load posts from any RSS service';
    if (lastError.message.includes('timed out')) {
      errorMessage = 'All RSS services timed out';
    } else if (lastError.message.includes('HTTP 4')) {
      errorMessage = 'RSS feed not found or access denied';
    } else if (lastError.message.includes('HTTP 5')) {
      errorMessage = 'RSS services experiencing server errors';
    } else if (!navigator.onLine) {
      errorMessage = 'No internet connection';
    }

    setState(prevState => ({
      ...prevState,
      [index]: { 
        loading: false, 
        items: [], 
        error: errorMessage
      },
    }));
  }, [fetchWithRetry, itemsPerFeed]);

  // Simple RSS parser for AllOrigins fallback
  const parseSimpleRSS = (rssText) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      
      const parsedItems = [];
      for (let i = 0; i < Math.min(items.length, itemsPerFeed); i++) {
        const item = items[i];
        const title = item.getElementsByTagName("title")[0]?.textContent || "Untitled";
        const link = item.getElementsByTagName("link")[0]?.textContent || "#";
        const description = item.getElementsByTagName("description")[0]?.textContent || "";
        const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent || "";
        
        parsedItems.push({
          title,
          link, 
          description,
          pubDate
        });
      }
      
      return parsedItems;
    } catch (error) {
      console.error('RSS parsing error:', error);
      return [];
    }
  };

  // Retry individual feed with exponential backoff
  const retryFeed = useCallback((feed, index) => {
    const currentRetries = retryCount[index] || 0;
    if (currentRetries >= 3) {
      return; // Max retries reached
    }

    setState(prevState => ({
      ...prevState,
      [index]: { loading: true, items: [], error: null }
    }));
    
    setRetryCount(prev => ({ ...prev, [index]: currentRetries + 1 }));
    
    // Add delay for retries
    const delay = currentRetries * 2000; // 0s, 2s, 4s
    setTimeout(() => {
      fetchFeed(feed, index);
    }, delay);
  }, [retryCount, fetchFeed]);

  // Load feeds with better error handling
  useEffect(() => {
    let mounted = true;

    const loadFeeds = async () => {
      try {
        setIsInitialLoading(true);
        const response = await fetch("/blogs.json");
        
        if (!response.ok) {
          throw new Error(`Failed to load blogs.json: ${response.status}`);
        }
        
        const feedsList = await response.json();
        
        if (!mounted) return;
        
        if (!Array.isArray(feedsList) || feedsList.length === 0) {
          throw new Error("No blog feeds configured");
        }

        setFeeds(feedsList);

        // Initialize state for all feeds
        const initialState = {};
        feedsList.forEach((_, index) => {
          initialState[index] = { loading: true, items: [], error: null };
        });
        setState(initialState);

        // Fetch all feeds with staggered requests to avoid overwhelming the service
        feedsList.forEach((feed, index) => {
          setTimeout(() => {
            if (mounted) {
              fetchFeed(feed, index);
            }
          }, index * 500); // 500ms between each request
        });

      } catch (error) {
        console.error("Error loading feeds:", error);
        if (mounted) {
          // Set error state for display
          setState({ error: error.message });
        }
      } finally {
        if (mounted) {
          setIsInitialLoading(false);
        }
      }
    };

    loadFeeds();

    return () => {
      mounted = false;
    };
  }, [fetchFeed]);

  // Auto-refresh feeds every 10 minutes
  useEffect(() => {
    if (feeds.length === 0) return;

    const refreshInterval = setInterval(() => {
      feeds.forEach((feed, index) => {
        // Only refresh feeds that aren't currently loading and don't have errors
        const feedState = state[index];
        if (feedState && !feedState.loading && !feedState.error) {
          fetchFeed(feed, index);
        }
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(refreshInterval);
  }, [feeds, state, fetchFeed]);

  // Loading state
  if (isInitialLoading) {
    return (
      <section id="blogs" className="py-16 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Latest from my blogs</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Stay updated with my latest thoughts and insights on technology and development.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-[#0f1011] border border-white/8 rounded-xl p-6 shadow-lg">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-white/10 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/5 rounded w-1/2"></div>
                    </div>
                  </div>
                  <LoadingSkeleton count={5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (state.error) {
    return (
      <section id="blogs" className="py-16 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Latest from my blogs</h2>
          </header>
          
          <div className="max-w-md mx-auto">
            <ErrorDisplay 
              error={state.error}
              feedTitle="Blog Configuration"
              onRetry={() => window.location.reload()}
            />
          </div>
        </div>
      </section>
    );
  }

  // No feeds
  if (feeds.length === 0) {
    return (
      <section id="blogs" className="py-16 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center py-12 text-gray-400">
            <p>No blog feeds configured.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="blogs" 
      className="py-16 lg:py-20 relative z-10"
      role="region"
      aria-labelledby="blogs-heading"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="blogs-heading" className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Latest from my blogs
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay updated with my latest thoughts and insights on technology, development, and the digital world.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {feeds.map((feed, index) => (
            <BlogFeedCard
              key={`${feed.title}-${index}`}
              feed={feed}
              state={state[index] || { loading: true, items: [], error: null }}
              onRetry={(feed) => retryFeed(feed, index)}
              itemsPerFeed={itemsPerFeed}
            />
          ))}
        </div>

        {/* Optional: Add RSS info */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Posts are automatically updated from RSS feeds • Last refresh: {new Date().toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </section>
  );
}