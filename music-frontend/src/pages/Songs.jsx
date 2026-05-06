import { useEffect, useState } from "react";
import API_BASE_URL from "../api";
import { Link } from "react-router-dom";

function Songs() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [songs, setSongs] = useState([]);
  const [likedSongIds, setLikedSongIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSongs();

    if (user) {
      fetchLikedSongs();
    }
  }, [sortOrder]);

  const fetchSongs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs?sort=${sortOrder}`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load songs");
        return;
      }

      setSongs(data);
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${user.user_id}/liked-songs`,
        { cache: "no-store" },
      );

      const data = await response.json();

      if (!response.ok) return;

      setLikedSongIds(data.map((item) => item.song_id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const handlePlaySong = async (songId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${songId}/view`, {
        method: "PUT",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update views");
        return;
      }

      setSongs((prevSongs) =>
        prevSongs
          .map((song) =>
            song.song_id === songId
              ? { ...song, views: data.song.views }
              : song,
          )
          .sort((a, b) =>
            sortOrder === "desc" ? b.views - a.views : a.views - b.views,
          ),
      );
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleLikeToggle = async (songId) => {
    if (!user) {
      setMessage("Please log in to like songs");
      return;
    }

    const alreadyLiked = likedSongIds.includes(songId);

    try {
      const response = await fetch(
        alreadyLiked
          ? `${API_BASE_URL}/songs/${songId}/like/${user.user_id}`
          : `${API_BASE_URL}/songs/${songId}/like`,
        {
          method: alreadyLiked ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: alreadyLiked
            ? undefined
            : JSON.stringify({ user_id: user.user_id }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update like");
        return;
      }

      if (alreadyLiked) {
        setLikedSongIds((prev) => prev.filter((id) => id !== songId));
      } else {
        setLikedSongIds((prev) => [...prev, songId]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const filteredSongs = songs.filter((song) => {
    const target = `${song.song_title} ${song.album_title || ""}`.toLowerCase();
    return target.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Songs</h1>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={toggleSortOrder}
            className="rounded-xl bg-gray-800 px-4 py-3 text-white transition hover:bg-gray-900"
          >
            Views: {sortOrder === "desc" ? "High to Low" : "Low to High"}
          </button>
        </div>

        {message && (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {message}
          </p>
        )}

        {filteredSongs.length === 0 ? (
          <p className="text-gray-500">No songs found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSongs.map((song) => {
              const isLiked = likedSongIds.includes(song.song_id);

              return (
                <div
                  key={song.song_id}
                  className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    <Link
                      to={`/songs/${song.song_id}`}
                      className="no-underline transition hover:text-blue-600"
                    >
                      {song.song_title}
                    </Link>
                  </h3>

                  <div className="mb-4 space-y-1 text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Album:
                      </span>{" "}
                      {song.album_title || "No Album"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Duration:
                      </span>{" "}
                      {song.duration}s
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Views:
                      </span>{" "}
                      {song.views}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePlaySong(song.song_id)}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                    >
                      ▶ Play
                    </button>

                    <button
                      onClick={() => handleLikeToggle(song.song_id)}
                      className={`flex-1 rounded-lg px-3 py-2 text-white transition ${isLiked
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-400 hover:bg-gray-500"
                        }`}
                    >
                      {isLiked ? "♥ Unlike" : "♡ Like"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Songs;