import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) { 
        setMessage("Login realizado com sucesso!");
        window.location.href = "/home";
      } else {
        setMessage(response.data.message || "Erro no login");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Erro no login");
    }
    setIsLoading(false);
  };

  const redirectToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button
          onClick={handleLogin}
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Login"}
        </button>
        {message && <p className="login-message">{message}</p>}
        <button onClick={redirectToRegister} className="register-button">
          Não tem conta? Registre-se
        </button>
      </div>
    </div>
  );
}

export default Login;