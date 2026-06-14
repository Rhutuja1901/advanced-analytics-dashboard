import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Invalid credentials"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          padding: "10px",
          width: "250px",
        }}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        style={{
          padding: "10px",
          width: "250px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;