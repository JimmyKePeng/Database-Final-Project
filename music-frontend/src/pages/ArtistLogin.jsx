import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function ArtistLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/artists/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Artist login failed");
        return;
      }

      localStorage.removeItem("user");
      localStorage.setItem("artist", JSON.stringify(data.artist));

      setMessage("Artist login successful");
      //   navigate("/create-album");
      navigate("/artist-dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Artist Login</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="email"
          name="email"
          placeholder="Artist Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button type="submit">Login as Artist</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ArtistLogin;
