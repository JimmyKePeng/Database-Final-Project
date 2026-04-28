import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../api";
import { Link } from "react-router-dom";
function PlaylistDetail() {
  const { id } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlaylist();
    fetchSongs();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/playlists/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load playlist");
        return;
      }

      setPlaylistData(data);
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load songs");
        return;
      }

      setAllSongs(data);
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleAddSong = async (e) => {
    e.preventDefault();

    if (!selectedSongId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/playlists/${id}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_id: Number(selectedSongId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to add song");
        return;
      }

      setSelectedSongId("");
      fetchPlaylist();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleRemoveSong = async (songId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/playlists/${id}/songs/${songId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to remove song");
        return;
      }

      fetchPlaylist();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  if (message) return <p>{message}</p>;
  if (!playlistData) return <p>Loading...</p>;

  const { playlist, songs } = playlistData;

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Playlist Header */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            {playlist.playlist_name}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Created:</span>{" "}
            {playlist.created_date}
          </p>
        </div>

        {/* Add Song Form */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Add a Song</h3>

          <form
            onSubmit={handleAddSong}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <select
              value={selectedSongId}
              onChange={(e) => setSelectedSongId(e.target.value)}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select a song</option>
              {allSongs.map((song) => (
                <option key={song.song_id} value={song.song_id}>
                  {song.song_title}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Add Song
            </button>
          </form>
        </div>

        {/* Songs in Playlist */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-900">
            Songs in Playlist
          </h3>

          {songs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <p className="text-lg text-gray-500">
                No songs in this playlist.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Add your first song from the dropdown above.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {songs.map((song) => (
                <li
                  key={song.song_id}
                  className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <Link
                      to={`/songs/${song.song_id}`}
                      className="text-lg font-semibold text-gray-900 no-underline transition hover:text-blue-600"
                    >
                      {song.song_title}
                    </Link>
                    <p className="mt-1 text-sm text-gray-500">
                      {song.duration}s · {song.views} views
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveSong(song.song_id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetail;
