import React from 'react'

function Navbar() {
  return (
    <>
     <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-primary">
              <svg
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-xl font-display font-bold">NewsToday</h1>
            <nav className="hidden md:flex items-center gap-6 ml-6 text-sm">
              <a className="hover:text-primary">Home</a>
              <a className="hover:text-primary">World</a>
              <a className="hover:text-primary">Politics</a>
              <a className="hover:text-primary">Tech</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="hidden sm:block form-input px-3 py-2 rounded-lg border dark:bg-slate-800"
              placeholder="Search"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
