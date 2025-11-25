import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Newspaper, TrendingUp, Laptop, Users } from 'lucide-react';
import { fetchNews } from '../features/news/newsSlice';
import { hasValidImage } from '../utils/imageHelpers';

export default function Home() {
  const dispatch = useDispatch();
  const { newsData, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

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
                onClick={() => dispatch(fetchNews())}
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
          <section
            className="relative bg-cover bg-center text-white rounded-xl overflow-hidden mb-8 shadow-xl"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Major Breakthrough in AI Could Change the Future of Medicine
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-200 max-w-2xl">
                A new study reveals a groundbreaking AI model that can predict
                diseases years before symptoms appear, paving the way for
                preventative healthcare.
              </p>
              <button className="mt-6 bg-blue-600 px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Read More
              </button>
            </div>
          </section>

          {/* Top Stories */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-blue-600" />
              Top Stories
            </h3>

            <div className="pr-3">
              <div className="space-y-4">
                {newsData.topStories.filter(hasValidImage).slice(0, 5).map((story, idx) => (
                  <article
                    key={idx}
                    className="flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full md:w-56 h-48 object-cover flex-shrink-0"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {story.category || story.section || 'Top Stories'}
                        </div>
                        <h4 className="mt-1 text-lg font-bold leading-tight">
                          <a
                            href={story.link || story.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {story.title}
                          </a>
                        </h4>
                        {story.description && (
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            {story.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-4">
                          {story.source && <span>📍 {story.source}</span>}
                          {story.date && <span>🕒 {story.date}</span>}
                        </div>
                        <a
                          href={story.link || story.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                        >
                          Read more →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4 pr-6">
              <button className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                View All
              </button>
            </div>
          </section>

          {/* Trending */}
          {newsData.trending.filter(hasValidImage).length > 0 && (
            <section className="mb-8 max-w-[940px]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Trending
              </h3>

              <div className="overflow-x-auto pb-2 -mx-2 pr-5 pl-3">
                <div className="flex gap-4">
                  {newsData.trending.filter(hasValidImage).slice(0, 5).map((item, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[300px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-44 w-full object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold">{item.title}</h4>
                        <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          Read More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4 pr-6">
                <button className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  View All
                </button>
              </div>
            </section>
          )}

          {/* Politics */}
          {newsData.politics.filter(hasValidImage).length > 0 && (
            <section className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Politics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {newsData.politics.filter(hasValidImage).slice(0, 1).map((item, i) => (
                  <div key={i}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-2xl shadow-lg mb-4 w-full h-56 object-cover"
                    />
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    {item.description && (
                      <p className="text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
                <div className="space-y-4">
                  {newsData.politics.slice(1, 4).map((item, i) => (
                    <div key={i} className="border-b border-slate-200 dark:border-slate-700 pb-3">
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4 pr-6">
                <button className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  View All
                </button>
              </div>
            </section>
          )}

          {/* Technology */}
          {newsData.techArticles.filter(hasValidImage).length > 0 && (
            <section className="mb-8 max-w-[940px]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Laptop className="w-6 h-6 text-cyan-600" />
                Technology
              </h3>

              <div className="overflow-x-auto pb-2 -mx-2 pr-5 pl-3">
                <div className="flex space-x-4">
                  {newsData.techArticles.filter(hasValidImage).slice(0, 5).map((article, i) => (
                    <div
                      key={i}
                      className="inline-block align-top max-w-[300px] flex-shrink-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-48 w-full object-cover rounded-t-2xl"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">
                          {article.title}
                        </h4>
                        <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          Read More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4 pr-6">
                <button className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  View All
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block border-l border-slate-200 dark:border-slate-800 pl-6">
          <div className="sticky top-8">
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Most Read</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Global Economy Insights
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  AI in Daily Life
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Renewable Energy Push
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  New Discoveries in Space
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h5 className="font-bold mb-4">Editor's Picks</h5>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=60"
                    alt="pick"
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <div className="text-slate-500 text-xs uppercase mb-1">
                      Environment
                    </div>
                    <div className="font-bold text-sm">
                      The Silent Crisis: How Deforestation is Changing Our Planet
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=60"
                    alt="pick2"
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <div className="text-slate-500 text-xs uppercase mb-1">
                      Culture
                    </div>
                    <div className="font-bold text-sm">
                      The Culinary Revolution: A Look Inside the World's Top Kitchens
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-600 dark:text-slate-300">
          © {new Date().getFullYear()} NewsToday. All rights reserved.
        </div>
      </footer>
    </div>
  );
}