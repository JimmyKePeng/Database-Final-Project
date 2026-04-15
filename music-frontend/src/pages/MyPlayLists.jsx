import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function MyPlaylists() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${user.user_id}/playlists`,
      );
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load playlists");
        return;
      }

      setPlaylists(data);
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          playlist_name: playlistName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create playlist");
        return;
      }

      setPlaylistName("");
      fetchPlaylists();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>My Playlists</h2>

      <form onSubmit={handleCreatePlaylist} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="New playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit">Create Playlist</button>
      </form>

      {message && <p>{message}</p>}

      {playlists.length === 0 ? (
        <p>No playlists yet.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.playlist_id}>
              <Link to={`/playlists/${playlist.playlist_id}`}>
                {playlist.playlist_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPlaylists;
