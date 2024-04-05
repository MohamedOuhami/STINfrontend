import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        email,
        password
      });
  
      if (response.status === 200) {

        // Authentication succeeded
        console.log("User authenticated successfully");
        let token = response.data.token;
        localStorage.setItem("token",token)
        // Redirect or perform other actions upon successful login
      } else {
        // Authentication failed
        console.error("Authentication failed");
        // Handle error (display error message, etc.)
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
