import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import TodoSection from "../components/TodoSection";
import ProductSection from "../components/ProductSection";
import GithubSection from "../components/GithubSection";

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
      console.log("✅ Sign In success");
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("❌ Sign In error:", err.code);

      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setMessage(
          "Invalid email or password. If you are new, please sign up."
        );
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
      console.log("✅ Sign Up success");
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("❌ Sign Up error:", err.code);

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
      console.log("✅ Google login success");
      setShowLoginModal(false);
    } catch (err) {
      console.error("❌ Google login error:", err.code);
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
      console.log("✅ GitHub login success");
      setShowLoginModal(false);
    } catch (err) {
      console.error("❌ GitHub login error:", err.code);

      if (err.code === "auth/account-exists-with-different-credential") {
        setMessage(
          "This email is already registered using another login method. Please sign in with that method first."
        );
      } else if (err.code === "auth/popup-closed-by-user") {
        setMessage("Login popup was closed before completing sign in.");
      } else {
        setMessage("GitHub login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Home</h2>

      {/* GUEST MODE WARNING + UPGRADE CTA */}
      {user.isAnonymous && (
        <div
          style={{
            border: "1px solid orange",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <p style={{ color: "orange" }}>
            You are using Guest mode. Sign up to save your data permanently.
          </p>

          <button onClick={() => setShowLoginModal(true)}>
            Sign Up / Login
          </button>
        </div>
      )}

      {/* LOGIN MODAL FOR GUESTS */}
      {user.isAnonymous && showLoginModal && (
        <div
          style={{
            border: "2px solid blue",
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h3>Create Account or Sign In</h3>

          {/* GOOGLE LOGIN */}
          <button onClick={handleGoogleLogin} disabled={loading}>
            Continue with Google
          </button>

          <hr />

          {/* GITHUB LOGIN */}
          <button onClick={handleGithubLogin} disabled={loading}>
            Continue with GitHub
          </button>

          <hr />

          {/* EMAIL SIGN IN */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              Sign In
            </button>
          </form>

          {/* EMAIL SIGN UP */}
          <button onClick={handleSignUp} disabled={loading}>
            Sign Up
          </button>

          <button onClick={() => setShowLoginModal(false)} disabled={loading}>
            Cancel
          </button>

          {/* USER FEEDBACK */}
          {message && <p style={{ color: "red" }}>{message}</p>}

          {/* LOADING */}
          {loading && <p>Processing...</p>}
        </div>
      )}

      <TodoSection />

      <hr/>

      <ProductSection />

      <hr/>
      
      <GithubSection/>
    </div>
  );
};

export default Home;
