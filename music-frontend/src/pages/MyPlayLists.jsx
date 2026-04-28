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
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          My Playlists
        </h1>

        <form
          onSubmit={handleCreatePlaylist}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            placeholder="New playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            required
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Create Playlist
          </button>
        </form>

        {message && (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {message}
          </p>
        )}

        {playlists.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <p className="text-lg text-gray-500">No playlists yet.</p>
            <p className="mt-2 text-sm text-gray-400">
              Create your first playlist above.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {playlists.map((playlist) => (
              <li key={playlist.playlist_id}>
                <Link
                  to={`/playlists/${playlist.playlist_id}`}
                  className="block rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-xl font-bold text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {playlist.playlist_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPlaylists;
