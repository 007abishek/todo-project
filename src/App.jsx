import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./auth/AuthContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN ROUTE */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <Login key="login" />
            )
          }
        />

        {/* HOME ROUTE */}
        <Route
          path="/home"
          element={
            user ? (
              <div style={{ padding: "16px" }}>
                {/* ✅ NEW FEATURE (SAFE ADDITION) */}
                <ThemeToggle />

                {/* ✅ EXISTING CODE (UNCHANGED LOGIC) */}
                <h2>Home</h2>

                <p>
                  Logged in as:{" "}
                  {user.email ? user.email : "Guest User"}
                </p>

                <p>
                  Provider:{" "}
                  {user.isAnonymous
                    ? "Guest"
                    : user.providerData[0]?.providerId}
                </p>

                <button onClick={logout}>Logout</button>

                {/* EXISTING FEATURE */}
                <Home />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
