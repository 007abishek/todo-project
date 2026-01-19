import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInAnonymously,
} from "firebase/auth";

import { auth } from "../firebase/config";
import { migrateGuestTodos } from "../utils/indexDb"; // ✅ MERGE FUNCTION

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Track previous user (for guest → registered upgrade)
  const previousUserRef = useRef(null);

  console.log("AuthProvider rendered");

  // 🔐 GOOGLE LOGIN
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // 🔐 GITHUB LOGIN
  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // 👤 GUEST LOGIN
  const guestLogin = () => {
    return signInAnonymously(auth);
  };

  // 🔄 AUTH STATE LISTENER + MERGE LOGIC
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      console.log("Auth State changed:", u);

      const prevUser = previousUserRef.current;

      // 🔥 MERGE GUEST TODOS INTO REGISTERED USER
      if (
        prevUser &&
        prevUser.isAnonymous &&
        u &&
        !u.isAnonymous
      ) {
        console.log("🔄 Merging guest todos into registered user");
        await migrateGuestTodos(prevUser.uid, u.uid);
      }

      if (u) {
        console.log("✅ Logged in user:", u.email || "Guest");
      } else {
        console.log("❌ user logged out");
      }

      previousUserRef.current = u; // update ref AFTER merge
      setUser(u);
      setLoading(false);
    });

    return unsub;
  }, []);

  // 📧 EMAIL SIGN UP
  const signUp = async (email, password) => {
    console.log("➡️ Trying Signup with:", email);
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("🎉 SIGN UP SUCCESS:", res.user.email);
    return res;
  };

  // 📧 EMAIL SIGN IN
  const signIn = async (email, password) => {
    console.log("➡️ Trying SIGN IN with:", email);
    const res = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("🎉 SIGN IN SUCCESS:", res.user.email);
    return res;
  };

  // 🚪 LOGOUT
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        logout,
        googleLogin,
        githubLogin,
        guestLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
