import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      const role = data.role?.toLowerCase();
      login(data.token, {
        id: data.userId,
        name: data.name,
        role: data.role,
      });

      if (role === "admin") {
        navigate("/admin/seats");
      } else {
        navigate("/seats");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  //Styles
  const pageStyle = {
    background: "linear-gradient(to right, #fceabb, #f8b500)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    color: "#333",
  };

  const containerStyle = {
     maxWidth: '400px',
    width: '100%',
    padding: '40px 30px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    animation: 'fadeIn 0.6s ease forwards',
    boxSizing: 'border-box',
  };

  const headingStyle = {
    textAlign: "center",
    color: "#d35400",
    marginBottom: "25px",
    fontWeight: "700",
    fontSize: "2rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    margin: "10px 0 20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    color: "#333",
  };

  const passwordContainerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const togglePasswordBtnStyle = {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#d35400",
    fontWeight: "600",
    fontSize: "1.2rem",
    padding: 0,
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f0a500",
    color: "#333",
    fontWeight: "700",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "5px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1,
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "0.95rem",
    color: "#555",
    marginTop: "40px",
    marginBottom: "10px",
    gap: "8px",
  };


  const errorStyle = {
    color: "red",
    fontSize: "0.9rem",
    textAlign: "center",
    marginBottom: "15px",
  };

   const forgotLinkStyle = {
    display: "block",
    textAlign: "center",
    color: "#007BFF",
    textDecoration: "none",
    marginTop: "10px",
    marginBottom: "10px",
    fontWeight: "500",
  };

 

  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div style={pageStyle}>
        <form onSubmit={handleSubmit} style={containerStyle}>
          
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#d35400",
            }}
          >
            <FaLock size={70} />
          </div>

          <h2 style={headingStyle}>Login</h2>

          {error && <div style={errorStyle}>{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            autoComplete="username"
          />

          <div style={passwordContainerStyle}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, marginBottom: 0, paddingRight: "45px" }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={togglePasswordBtnStyle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div style={checkboxLabelStyle}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          <Link to="/forgot-password" style={forgotLinkStyle}>
            Forgot Password?
          </Link>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
