import React, { useEffect, useState } from 'react';
import { Newspaper, TrendingUp, Laptop, Users, Clock, ExternalLink } from 'lucide-react';

export default function Home() {
  const [newsData, setNewsData] = useState({
    topStories: [],
    trending: [],
    techArticles: [],
    politics: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://news-aggregator-dpvh.onrender.com/api/news');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      
      setNewsData({
        topStories: data.topStories || [],
        trending: data.trending || [],
        techArticles: data.techArticles || [],
        politics: data.politics || []
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fallback component for missing images
  const ImageFallback = ({ title, category, size = 'large' }) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-cyan-500 to-blue-600'
    ];
    
    const gradient = gradients[Math.floor(Math.random() * gradients.gradients.length)];
    const heightClass = size === 'large' ? 'h-48' : size === 'medium' ? 'h-44' : 'h-32';
    
    return (
      <div className={`${heightClass} w-full bg-gradient-to-br ${gradient} flex items-center justify-center p-6`}>
        <div className="text-center">
          <Newspaper className="w-12 h-12 text-white/80 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm line-clamp-2">{title}</p>
        </div>
      </div>
    );
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col max-w-full w-full min-h-screen bg-slate-50 dark:bg-slate-900">
        <main className="flex flex-1 max-w-7xl mx-auto px-6 py-8 w-full gap-8">
          <div className="flex-1">
            <div className="animate-pulse">
              <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col max-w-full w-full min-h-screen bg-slate-50 dark:bg-slate-900">
        <main className="flex flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Newspaper className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                Unable to Load News
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
              <button 
                onClick={fetchNewsData}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-full w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      {/* Main content */}
      <main className="flex flex-1 max-w-7xl mx-auto px-6 py-8 w-full gap-8">
        {/* Left content column */}
        <div className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl overflow-hidden mb-8 shadow-xl">
            <div className="p-10 md:p-16">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase tracking-wide">Breaking News</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                Stay Updated with the Latest News
              </h2>
              <p className="text-slate-100 max-w-2xl">
                Your trusted source for real-time news from around the world
              </p>
            </div>
          </section>

          {/* Top Stories */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold">Top Stories</h3>
            </div>

            <div className="space-y-4">
              {newsData.topStories.slice(0, 5).map((story, idx) => (
                <article
                  key={idx}
                  className="flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {story.imageLink || story.image ? (
                    <img
                      src={story.imageLink || story.image}
                      alt={story.title || 'news image'}
                      className="w-full md:w-56 h-48 object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="w-full md:w-56 flex-shrink-0">
                      <ImageFallback title={story.title} category={story.category} />
                    </div>
                  )}
                  <div className="hidden w-full md:w-56 flex-shrink-0">
                    <ImageFallback title={story.title} category={story.category} />
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {story.category || story.section || 'News'}
                      </div>
                      <h4 className="mt-1 text-lg font-bold leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <a href={story.link || story.url} target="_blank" rel="noreferrer">
                          {story.title}
                        </a>
                      </h4>
                      {story.description && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                          {story.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-4">
                        {story.source && <span>📍 {story.source}</span>}
                        {(story.date || story.time) && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {story.date || story.time}
                          </span>
                        )}
                      </div>
                      <a
                        href={story.link || story.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        Read more <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Trending */}
          {newsData.trending.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold">Trending</h3>
              </div>

              <div className="overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex gap-4">
                  {newsData.trending.map((item, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[300px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {item.imageLink || item.img ? (
                        <img
                          src={item.imageLink || item.img}
                          alt={item.title || 'news image'}
                          className="h-44 w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <ImageFallback title={item.title} size="medium" />
                      )}
                      <div className="hidden">
                        <ImageFallback title={item.title} size="medium" />
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold line-clamp-2">{item.title}</h4>
                        <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          Read More <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Politics */}
          {newsData.politics.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold">Politics</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {newsData.politics.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    {item.imageLink || item.image ? (
                      <img
                        src={item.imageLink || item.image}
                        alt={item.title || 'news image'}
                        className="w-full h-56 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <ImageFallback title={item.title} />
                    )}
                    <div className="hidden">
                      <ImageFallback title={item.title} />
                    </div>
                    
                    <div className="p-4">
                      <h4 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h4>
                      {item.description && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technology */}
          {newsData.techArticles.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Laptop className="w-6 h-6 text-cyan-600" />
                <h3 className="text-2xl font-bold">Technology</h3>
              </div>

              <div className="overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex gap-4">
                  {newsData.techArticles.map((article, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[300px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {article.imageLink || article.image ? (
                        <img
                          src={article.imageLink || article.image}
                          alt={article.title || 'news image'}
                          className="h-48 w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <ImageFallback title={article.title} />
                      )}
                      <div className="hidden">
                        <ImageFallback title={article.title} />
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold line-clamp-2">{article.title}</h4>
                        <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          Read More <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block border-l border-slate-200 dark:border-slate-800 pl-6">
          <div className="sticky top-8">
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  🌍 Global Economy Insights
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  🤖 AI in Daily Life
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  ♻️ Renewable Energy Push
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  🚀 New Discoveries in Space
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={fetchNewsData}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Refresh News
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-600 dark:text-slate-300">
          © {new Date().getFullYear()} NewsToday. All rights reserved.
        </div>
      </footer>
    </div>
  );
}