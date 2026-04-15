import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../api";

function AlbumDetail() {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/albums/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load album");
          return;
        }

        setAlbumData(data);
      } catch (error) {
        console.error(error);
        setMessage("Server error");
      }
    };

    fetchAlbum();
  }, [id]);

  if (message) return <p>{message}</p>;
  if (!albumData) return <p>Loading...</p>;

  const { album, artists, songs } = albumData;

  return (
    <div>
      <h2>{album.album_title}</h2>
      <p>Release Year: {album.release_year}</p>

      <h3>Artists</h3>
      {artists.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <ul>
          {artists.map((artist) => (
            <li key={artist.artist_id}>
              {artist.first_name} {artist.last_name}
            </li>
          ))}
        </ul>
      )}

      <h3>Songs</h3>
      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.song_id}>
              {song.song_title} - {song.duration}s - {song.views} views
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AlbumDetail;
