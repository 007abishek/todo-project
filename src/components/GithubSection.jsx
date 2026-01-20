import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const GithubSection = () => {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Restrict guest users
  if (user.isAnonymous) {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          GitHub Repository Search
        </h3>
        <p className="text-orange-500 text-sm">
          Login to search GitHub repositories
        </p>
      </div>
    );
  }

  const handleSearch = async () => {
    if (!query.trim()) return;

    if (!navigator.onLine) {
      setError("You are offline. Cannot search GitHub.");
      return;
    }

    setLoading(true);
    setError("");
    setRepos([]);

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );

      if (!res.ok) {
        throw new Error("GitHub API error");
      }

      const data = await res.json();
      setRepos(data.items.slice(0, 10));
    } catch {
      setError("Failed to fetch repositories. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        GitHub Repository Search
      </h3>

      {/* SEARCH BAR */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search GitHub repositories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 
                     bg-white text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-md bg-blue-600 text-white
                     hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-500">
          Searching repositories...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {/* RESULTS */}
      {repos.length > 0 && (
        <ul className="space-y-3">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="p-4 rounded-lg border border-gray-200
                         bg-gray-50 hover:bg-gray-100 transition"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {repo.full_name}
              </a>

              <div className="text-sm text-gray-600 mt-1">
                ⭐ {repo.stargazers_count.toLocaleString()} stars
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GithubSection;
