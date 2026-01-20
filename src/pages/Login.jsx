import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { signIn, signUp, googleLogin, githubLogin, guestLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setMessage("");
  }, []);

  const handleSignIn = async () => {
    setMessage("");
    setLoading(true);
    try {
      await signIn(email, password);
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

  const handleSignUp = async () => {
    setMessage("");
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setMessage("Account already exists. Please sign in.");
      } else if (err.code === "auth/weak-password") {
        setMessage("Password must be at least 6 characters.");
      } else {
        setMessage("Unable to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      await googleLogin();
    } catch {
      setMessage("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      await githubLogin();
    } catch {
      setMessage("GitHub login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      await guestLogin();
    } catch {
      setMessage("Guest login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Authentication
        </h2>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          Continue with Google
        </button>

        <button
          onClick={handleGithubLogin}
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md disabled:opacity-50"
        >
          Continue with GitHub
        </button>

        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          Continue as Guest
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
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md disabled:opacity-50"
          >
            Sign In
          </button>
        </form>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-md disabled:opacity-50"
        >
          Sign Up
        </button>

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}

        {loading && (
          <p className="text-center text-gray-500 text-sm">Processing...</p>
        )}
      </div>
    </div>
  );
};

export default Login;
