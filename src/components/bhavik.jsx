import React from "react";

export default function Home() {
  const topStories = [
    {
      category: "Top Stories",
      title:
        "Netanyahu says he hopes to announce hostages' release in days and vows Hamas will be disarmed",
      description:
        "The Israeli prime minister's comments come after Hamas agreed to release hostages under a US-proposed peace plan.",
      time: "",
      region: "",
      url: "https://www.bbc.com/news/live/cn0xvnxqj2xt",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/5e94/live/7548e480-a112-11f0-807b-c1a7ae4b635d.jpg.webp",
    },
    {
      category: "Top Stories",
      title:
        "Shock in Gaza as Trump appears to welcome Hamas response to US peace plan",
      description:
        "Hamas agreed to release the hostages and to the idea of handing over governing Gaza to Palestinian technocrats, but did not give a clear response to many other elements.",
      time: "6 hrs ago",
      region: "",
      url: "https://www.bbc.com/news/articles/c15k199j1x3o",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/5e94/live/7548e480-a112-11f0-807b-c1a7ae4b635d.jpg.webp",
    },
    {
      category: "Top Stories",
      title: "Sanae Takaichi set to become Japan's first female prime minister",
      description:
        "Takaichi is a long-time admirer of Margaret Thatcher, but many female voters do not see her as an advocate for progress.",
      time: "14 hrs ago",
      region: "Asia",
      url: "https://www.bbc.com/news/articles/cx2pmy7m72lo",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/9b87/live/744acaa0-a0f0-11f0-9eb0-91e02c1733f7.jpg.webp",
    },
    {
      category: "Top Stories",
      title: "Georgia protesters try to storm Tbilisi presidential palace",
      description:
        "Police used pepper spray to disperse demonstrators amid growing turmoil in the Caucasus country.",
      time: "3 hrs ago",
      region: "Europe",
      url: "https://www.bbc.com/news/articles/ce86kgnj7zro",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/323f/live/91f80ab0-a082-11f0-bb47-b30225268691.jpg.webp",
    },
    {
      category: "Top Stories",
      title:
        "Hope and fear for hostage families after Hamas response to Gaza peace plan",
      description:
        "Families describe a 'fragile situation', with negotiations between Israel and Hamas expected to resume.",
      time: "5 hrs ago",
      region: "Middle East",
      url: "https://www.bbc.com/news/articles/cly9e6mnve9o",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/c2dd/live/0727e8c0-a135-11f0-a9f1-8d9167fcc08f.jpg.webp",
    },
    {
      category: "Top Stories",
      title:
        "'I love you, I'm sorry': What Sean 'Diddy' Combs did the moment he learned his sentence",
      description:
        "It was a more subdued message from three months ago when Combs told his family he was 'coming home'.",
      time: "22 hrs ago",
      region: "",
      url: "https://www.bbc.com/news/articles/c62z19lpwd2o",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/2df8/live/229cc4c0-a0a6-11f0-a678-e375131d5a07.jpg.webp",
    },
    {
      category: "Top Stories",
      title:
        "Taylor Swift says diss track is 'love letter to someone who hates me'",
      description:
        "Fans are convinced the pop star's song Actually Romantic is a response to a Charli XCX track.",
      time: "8 hrs ago",
      region: "Culture",
      url: "https://www.bbc.com/news/articles/ckg24xvyzxwo",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/dd7e/live/3de510a0-a116-11f0-b741-177e3e2c2fc7.jpg.webp",
    },
    {
      category: "Top Stories",
      title: "Trump's Grim Reaper - from Project 2025 to shutdown enforcer",
      description:
        "The Office of Management and Budget boss may not be a household name, but he's a key figure in Washington's shutdown.",
      time: "23 hrs ago",
      region: "US & Canada",
      url: "https://www.bbc.com/news/articles/c059ydyqe19o",
      image:
        "https://ichef.bbci.co.uk/news/480/cpsprodpb/323f/live/91f80ab0-a082-11f0-bb47-b30225268691.jpg.webp",
    },
  ];

  const trending = [
    {
      title: "Global Summit 2025: Leaders Address Climate Change",
      img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Tech Giants Unveil Breakthrough AI Innovations",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Sports Update: The Championship Thriller Ends in Style",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Sports Update: The Championship Thriller Ends in Style",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Sports Update: The Championship Thriller Ends in Style",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=60",
    },
  ];

  const techArticles = [
    {
      title: "AI Models Break New Barriers in Healthcare",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Quantum Computing Becomes Reality",
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "AI Models Break New Barriers in Healthcare",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "Quantum Computing Becomes Reality",
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  return (
    <div className="flex flex-col max-w-full w-full min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100">
      {/* Top Navbar */}

      {/* Main content */}
      <main className="flex flex-1 max-w-7xl mx-auto px-6 py-8 w-full gap-8">
        {/* Left content column */}
        <div className="flex-1">
          {/* Hero */}
          <section
            className="relative bg-cover bg-center text-white rounded-xl overflow-hidden mb-8"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-display font-extrabold leading-tight">
                Major Breakthrough in AI Could Change the Future of Medicine
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-200 max-w-2xl">
                A new study reveals a groundbreaking AI model that can predict
                diseases years before symptoms appear, paving the way for
                preventative healthcare.
              </p>
              <button className="mt-6 bg-primary px-5 py-3 rounded-lg font-semibold">
                Read More
              </button>
            </div>
          </section>

          {/* Top Stories - scrollable block that shows 3 cards at a time */}
          <section className="mb-8">
            <h3 className="text-2xl font-display font-bold mb-4">
              Top Stories
            </h3>

            {/* Scroll container: fixed height so 3 cards are visible; overflow-y scroll */}
            <div className="pr-3">
              <div className="space-y-4">
                {topStories.slice(0, 5).map((s, idx) => (
                  <article
                    key={idx}
                    className="flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                    style={{ minHeight: "12rem" }} // ensure consistent card height (h-48)
                  >
                    {s.image && (
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full md:w-56 h-48 object-cover flex-shrink-0"
                      />
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-sm text-primary font-semibold">
                          {s.category}
                        </div>
                        <h4 className="mt-1 text-lg font-bold leading-tight">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                          >
                            {s.title}
                          </a>
                        </h4>
                        {s.description && (
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            {s.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div>{s.region && <span>📍 {s.region}</span>}</div>
                        <div className="flex items-center gap-4">
                          {s.time && <span>🕒 {s.time}</span>}
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                          >
                            Read more →
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4 pr-6">
              <button className="text-sm text-primary font-semibold hover:underline">
                View All
              </button>
            </div>
          </section>

          {/* Trending */}
          <section className="mb-8 max-w-[940px]">
            <h3 className="text-2xl font-display font-bold mb-4">Trending</h3>

            {/* Horizontal scroll container */}
            <div className="overflow-x-auto pb-2 -mx-2 pr-5 pl-3">
              <div className="flex gap-4">
                {trending.map((t, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[300px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={t.img}
                      alt={t.title}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold">{t.title}</h4>
                      <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Politics */}
          <section className="mb-8">
            <h3 className="text-2xl font-display font-bold mb-4">Politics</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1600&q=80"
                  alt="Politics"
                  className="rounded-2xl shadow-lg mb-4 w-full h-56 object-cover"
                />
                <h4 className="text-xl font-bold mb-2">
                  Inside the Capitol: New Policies on the Horizon
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Lawmakers are set to discuss several major bills this week
                  that could reshape the nation’s future.
                </p>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  Senate Approves New Economic Bill
                </div>
                <div className="border-b pb-3">
                  Leaders Debate International Trade Agreements
                </div>
                <div className="border-b pb-3">
                  Public Opinion Shifts on Energy Reform
                </div>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section className="mb-8 max-w-[940px]">
            <h3 className="text-2xl font-display font-bold mb-4">Technology</h3>

            <div
              className="overflow-x-auto pb-2 -mx-2 pr-5 pl-3"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
              }}
            >
              <div className="flex space-x-4">
                {techArticles.map((a, i) => (
                  <div
                    key={i}
                    className="inline-block align-top max-w-[300px] flex-shrink-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm"
                  >
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-48 w-full object-cover rounded-t-2xl"
                    />
                    <div className="p-4">
                      <h4 className="font-bold flex text-gray-900 dark:text-gray-100">
                        {a.title}
                      </h4>
                      <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block border-l border-slate-200 dark:border-slate-800 pl-6">
          <div className="mb-8">
            <h4 className="text-xl font-display font-bold mb-4">Most Read</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="hover:text-primary cursor-pointer">
                Global Economy Insights
              </li>
              <li className="hover:text-primary cursor-pointer">
                AI in Daily Life
              </li>
              <li className="hover:text-primary cursor-pointer">
                Renewable Energy Push
              </li>
              <li className="hover:text-primary cursor-pointer">
                New Discoveries in Space
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h5 className="font-bold mb-2">Editor's Picks</h5>
            <div className="space-y-4">
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=60"
                  alt="pick"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <div className="text-slate-500 text-xs uppercase mb-1">
                    Environment
                  </div>
                  <div className="font-bold">
                    The Silent Crisis: How Deforestation is Changing Our Planet
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=60"
                  alt="pick2"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <div className="text-slate-500 text-xs uppercase mb-1">
                    Culture
                  </div>
                  <div className="font-bold">
                    The Culinary Revolution: A Look Inside the World's Top
                    Kitchens
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
