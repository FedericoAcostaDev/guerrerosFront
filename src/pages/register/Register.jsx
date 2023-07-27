import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Registrarse</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Nombre de usuario"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Escribe un mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Escribe una contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Registrarse
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Ya tengo cuenta
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Surgió un problema, intenta modificar los datos.
        </span>
      )}
    </div>
  );
}
