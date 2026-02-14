import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleSignup() {
    try {
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleLogin() {
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleLogout() {
    try {
      setError("");
      await signOut(auth);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{user ? "Account" : (isLogin ? "Login" : "Sign Up")}</h2>
          </div>

          {error && (
            <div className="error-message" style={{ 
              marginBottom: "1rem", 
              padding: "1rem", 
              backgroundColor: "#fee", 
              borderRadius: "8px",
              color: "#c00"
            }}>
              {error}
            </div>
          )}

          {user ? (
            // Logged in view
            <div className="login-form">
              <div className="user-info" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <p style={{ color: "#888" }}>Logged in as</p>
                <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>{user.email}</p>
              </div>

              <div className="logout-section">
                <button onClick={handleLogout} className="login-btn secondary">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // Not logged in view
            <div className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (isLogin ? handleLogin() : handleSignup())}
                  className="login-input"
                />
              </div>

              <div className="button-group">
                {isLogin ? (
                  <button onClick={handleLogin} className="login-btn primary">
                    Login
                  </button>
                ) : (
                  <button onClick={handleSignup} className="login-btn primary">
                    Sign Up
                  </button>
                )}
              </div>

              <div className="toggle-mode">
                {isLogin ? (
                  <p>
                    Don't have an account?{' '}
                    <span onClick={() => setIsLogin(false)} className="toggle-link">
                      Sign Up
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <span onClick={() => setIsLogin(true)} className="toggle-link">
                      Login
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="deco deco-heart-1">♥</div>
        <div className="deco deco-heart-2">♥</div>
        <div className="deco deco-star-1">★</div>
        <div className="deco deco-star-A2">★</div>
        <div className="deco deco-cloud-1">☁</div>
        <div className="deco deco-cloud-2">☁</div>
      </div>
    </div>
  );
}