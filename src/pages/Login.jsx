import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { signIn, signUp, googleLogin , githubLogin , guestLogin} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear form fields on component mount to prevent autofill
  useEffect(() => {
    setEmail("");
    setPassword("");
    setMessage("");
  }, []);

  // EMAIL SIGN IN
  const handleSignIn = async () => {
    setMessage("");
    setLoading(true);

    try {
      await signIn(email, password);
      console.log("✅ Sign In success");
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
    } catch (err) {
      console.error("❌ Google login error:", err.code);
      setMessage("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
   //Github Login

  const handleGithubLogin = async () => {
  setMessage("");
  setLoading(true);

  try {
    await githubLogin();
    console.log("✅ GitHub login success");
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

  const handleGuestLogin = async () => {
  setMessage("");
  setLoading(true);

  try {
    await guestLogin();
    console.log("✅ Guest login success");
  } catch (err) {
    console.error("❌ Guest login error:", err.code);
    setMessage("Guest login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};





  return (
    <div>
      <h2>Authentication</h2>

      {/* 🔵 GOOGLE LOGIN */}
      <button onClick={handleGoogleLogin} disabled={loading}>
        Continue with Google
      </button>

      <hr />

      {/* github login*/}
      <button onClick={handleGithubLogin} disabled={loading}>
         Continue with GitHub
      </button>

      <hr/>

      {/*Guest login*/}
      <button onClick={handleGuestLogin} disabled={loading}>
           Continue as Guest
      </button>

      <hr />



      {/* 📧 EMAIL SIGN IN */}
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <input
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          Sign In
        </button>
      </form>

      {/* 🆕 EMAIL SIGN UP */}
      <button onClick={handleSignUp} disabled={loading}>
        Sign Up
      </button>

      {/* 🔔 USER FEEDBACK */}
      {message && <p style={{ color: "red" }}>{message}</p>}

      {/* ⏳ LOADING */}
      {loading && <p>Processing...</p>}
    </div>
  );
};

export default Login;
