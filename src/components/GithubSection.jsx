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
      <div>
        <h3>GitHub Repository Search</h3>
        <p style={{ color: "orange" }}>
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
      setRepos(data.items.slice(0, 10)); // limit results
    } catch (err) {
      setError("Failed to fetch repositories. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>GitHub Repository Search</h3>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search GitHub repositories"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* LOADING */}
      {loading && <p>Searching repositories...</p>}

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* RESULTS */}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank">
              {repo.full_name}
            </a>
            <p>⭐ {repo.stargazers_count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GithubSection;
