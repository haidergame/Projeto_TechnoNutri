import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });

      if (response.status === 201) {
        setMessage("Registro realizado com sucesso!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage(response.data.message || "Erro ao registrar");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Erro ao registrar");
    }
    setIsLoading(false);
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>
      <div className="register-form">
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button
          onClick={handleRegister}
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Registrar"}
        </button>
        {message && <p className="register-message">{message}</p>}
        <button onClick={redirectToLogin} className="login-button">
          Já tem uma conta? Clique aqui para Login
        </button>
      </div>
    </div>
  );
}

export default Register;