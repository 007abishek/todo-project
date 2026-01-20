import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import TodoSection from "../components/TodoSection";
import ProductSection from "../components/ProductSection";
import GithubSection from "../components/GithubSection";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const { user, signIn, signUp, googleLogin, githubLogin, logout } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // EMAIL SIGN IN
  const handleSignIn = async () => {
    setMessage("");
    setLoading(true);
    try {
      await signIn(email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setMessage("Invalid email or password. If you are new, please sign up.");
      } else if (err.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // EMAIL SIGN UP
  const handleSignUp = async () => {
    setMessage("");
    setLoading(true);
    try {
      await signUp(email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setMessage("Account already exists. Please sign in.");
      } else if (err.code === "auth/weak-password") {
        setMessage("Password must be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      await googleLogin();
      setShowLoginModal(false);
    } catch {
      setMessage("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // GITHUB LOGIN
  const handleGithubLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      await githubLogin();
      setShowLoginModal(false);
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        setMessage(
          "This email is already registered using another login method."
        );
      } else {
        setMessage("GitHub login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-gray-200/70 dark:border-slate-700/70">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          <h1 className="text-lg font-semibold">Home</h1>

          <div className="flex items-center gap-4">

            {/* AVATAR */}
            <div className="relative group">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-slate-600"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                  {user.email ? user.email[0].toUpperCase() : "G"}
                </div>
              )}

              <div className="absolute right-0 mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {user.email || "Guest User"}
              </div>
            </div>

            <ThemeToggle />

            <button
              onClick={logout}
              className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">

        {/* GUEST WARNING */}
        {user.isAnonymous && (
          <div className="rounded-xl border border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-950 p-5">
            <p className="text-orange-700 dark:text-orange-400 mb-3">
              You are using Guest mode. Sign up to save your data permanently.
            </p>

            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Sign Up / Login
            </button>
          </div>
        )}

        {/* LOGIN MODAL */}
        {user.isAnonymous && showLoginModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl">

              <h3 className="text-xl font-semibold text-center">
                Create Account or Sign In
              </h3>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-red-500 text-white py-2 rounded-md"
              >
                Continue with Google
              </button>

              <button
                onClick={handleGithubLogin}
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2 rounded-md"
              >
                Continue with GitHub
              </button>

              <div className="text-center text-gray-400">OR</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignIn();
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-md"
                >
                  Sign In
                </button>
              </form>

              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full border border-green-600 text-green-600 py-2 rounded-md"
              >
                Sign Up
              </button>

              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full text-gray-500"
              >
                Cancel
              </button>

              {message && (
                <p className="text-red-500 text-sm text-center">{message}</p>
              )}
            </div>
          </div>
        )}

        {/* SECTIONS */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <TodoSection />
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <ProductSection />
        </section>

        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
          <GithubSection />
        </section>
      </main>
    </div>
  );
};

export default Home;
