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
    <div>
      <h2>{playlist.playlist_name}</h2>
      <p>Created: {playlist.created_date}</p>

      <form onSubmit={handleAddSong} style={{ marginBottom: "20px" }}>
        <select
          value={selectedSongId}
          onChange={(e) => setSelectedSongId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">Select a song</option>
          {allSongs.map((song) => (
            <option key={song.song_id} value={song.song_id}>
              {song.song_title}
            </option>
          ))}
        </select>

        <button type="submit">Add Song</button>
      </form>

      <h3>Songs in Playlist</h3>
      {songs.length === 0 ? (
        <p>No songs in this playlist.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.song_id}>
              <Link to={`/songs/${song.song_id}`}>
                {song.song_title} - {song.duration}s -{song.views} views
              </Link>
              <button
                onClick={() => handleRemoveSong(song.song_id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlaylistDetail;
