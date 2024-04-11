import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUserData } from "../contexts/userDataContext";
import { useAuth } from "../contexts/authContext";
import "./style.css";

const LoginPage = () => {
  // let [isOpen, setIsOpen] = useState(false)
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { path } = useUserData();
  const [errorMessage, setErrorMessage] = useState("");

  if (localStorage.getItem("user")) {
    login();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${path}/api/v1/auth/authenticate`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        console.log(response.data.token);
        login();
      }
    } catch (error) {
      console.error("Erreur d'authentification", error);
      setErrorMessage("email or password incorrect");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form method="POST" onSubmit={handleSubmit} className="form-login">
        <h3>Login Here</h3>

        <label htmlFor="email">Username</label>
        <input
          type="email"
          placeholder="Email or Phone"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
          id="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        {errorMessage.length > 0 && <p>{errorMessage}</p>}
        <button>Log In</button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
