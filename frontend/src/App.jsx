import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5001/api/auth/login",
          {
            email: form.email,
            password: form.password
          }
        );

        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
        setMessage("");

      } else {
        const res = await axios.post(
          "http://localhost:5001/api/auth/register",
          form
        );

        setMessage(res.data.message);
        setIsLogin(true);
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (loggedIn) {
    return <Dashboard logout={logout} />;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>DevOpsHub 🚀</h1>
        <p>Cloud Control Center</p>

        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Sign In" : "Create Account"}
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;