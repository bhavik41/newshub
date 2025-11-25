import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {ArrowLeft, Newspaper, Search, Filter, Loader, ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchAllNews,
  setSearchQuery,
  setSelectedSection,
} from "../features/news/allNewsSlice";
import { hasValidImage } from "../utils/imageHelpers";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";    

export default function AllNews() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { items, loading, error, hasMore, searchQuery, selectedSection, page } =
    useSelector((state) => state.allNews);

  const observerTarget = useRef(null);
  const isLoadingRef = useRef(false);

  const SECTION_MAP = useMemo(
    () => ({
      news: "Top Stories",
      explore: "MORE TO EXPLORE",
      watch: "MOST WATCHED",
      tech: "Technology",
      politics: "politics",
      trending: "TRENDING",
      sport: "Sport",
      all: "all",
    }),
    []
  );

  // Update section when route changes
  useEffect(() => {
    const path = location.pathname.substring(1);
    const mapped = SECTION_MAP[path] || "all";
    if (mapped !== selectedSection) {
      dispatch(setSelectedSection(mapped));
    }
  }, [location.pathname, SECTION_MAP, selectedSection, dispatch]);

  // Fetch on search or section change (resets to page 1)
  useEffect(() => {
    isLoadingRef.current = true;
    dispatch(
      fetchAllNews({
        page: 1,
        limit: 30,
        search: searchQuery,
        section: selectedSection,
      })
    );
  }, [dispatch, searchQuery, selectedSection]);

  // Update loading ref when loading state changes
  useEffect(() => {
    isLoadingRef.current = loading;
  }, [loading]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only load more if: 1) entry is visible, 2) more items available, 3) not currently loading
        if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
          isLoadingRef.current = true;
          dispatch(
            fetchAllNews({
              page: page + 1,
              limit: 30,
              search: searchQuery,
              section: selectedSection,
            })
          );
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [dispatch, hasMore, page, searchQuery, selectedSection]);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      dispatch(setSearchQuery(value));
    },
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (e) => {
      const value = e.target.value;
      dispatch(setSelectedSection(value));
    },
    [dispatch]
  );

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      isLoadingRef.current = true;
      dispatch(
        fetchAllNews({
          page: page - 1,
          limit: 30,
          search: searchQuery,
          section: selectedSection,
        })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [dispatch, page, searchQuery, selectedSection]);

  const handleNextPage = useCallback(() => {
    if (hasMore) {
      isLoadingRef.current = true;
      dispatch(
        fetchAllNews({
          page: page + 1,
          limit: 30,
          search: searchQuery,
          section: selectedSection,
        })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [dispatch, page, hasMore, searchQuery, selectedSection]);

  const itemsWithImages = useMemo(() => items.filter(hasValidImage), [items]);

  return (
    <div className="flex flex-col max-w-full w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Newspaper className="w-10 h-10 text-blue-600" />
            All News
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse all news articles with search and filters
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative md:w-64">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={selectedSection}
              onChange={handleCategoryChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Sections</option>
              <option value="Top Stories">Top Stories</option>
              <option value="MORE TO EXPLORE">MORE TO EXPLORE</option>
              <option value="MOST WATCHED">MOST WATCHED</option>
              <option value="Technology">Technology</option>
              <option value="politics">politics</option>
              <option value="TRENDING">TRENDING</option>
              <option value="Sport">Sport</option>
              <option value="Opinion">Opinion</option>
              <option value="Culture">Culture</option>
            </select>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Loading state for initial load */}
        {loading && page === 1 && (
          <div className="flex justify-center items-center py-16">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-slate-600 dark:text-slate-400">
              Loading news...
            </span>
          </div>
        )}

        {/* News Grid */}
        {!loading || page > 1 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {itemsWithImages.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {item.section || "News"}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <a
                        href={item.link || item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                      </a>
                    </h3>
                    {item.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-3">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      {item.source && <span>📍 {item.source}</span>}
                      {item.date && <span>🕒 {item.date}</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Loading State for pagination */}
            {loading && page > 1 && (
              <div className="flex justify-center items-center py-8">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600 dark:text-slate-400">
                  Loading more news...
                </span>
              </div>
            )}

            {/* Empty State */}
            {!loading && itemsWithImages.length === 0 && (
              <div className="text-center py-16">
                <Newspaper className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  No news found
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {/* No More Items */}
            {!loading && !hasMore && itemsWithImages.length > 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <p>You've reached the end of the news feed</p>
              </div>
            )}
          </>
        ) : null}

        {/* Pagination Controls */}
        {!loading && itemsWithImages.length > 0 && (
          <div className="flex justify-center items-center gap-4 py-8 mb-8">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400">
                Page
              </span>
              <input
                type="number"
                value={page}
                onChange={(e) => {
                  const newPage = parseInt(e.target.value) || 1;
                  if (newPage > 0) {
                    isLoadingRef.current = true;
                    dispatch(
                      fetchAllNews({
                        page: newPage,
                        limit: 30,
                        search: searchQuery,
                        section: selectedSection,
                      })
                    );
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="w-16 px-2 py-1 text-center rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
              <span className="text-slate-600 dark:text-slate-400">
                of many
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={!hasMore}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={observerTarget} className="h-10" />
      </main>
    </div>
  );
}