import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../api";
import { Link } from "react-router-dom";

function SongDetail() {
  const { id } = useParams();
  const [songData, setSongData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/songs/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load album");
          return;
        }

        setSongData(data);
      } catch (error) {
        console.error(error);
        setMessage("Server error");
      }
    };

    fetchSong();
  }, [id]);

  if (message) return <p>{message}</p>;
  if (!songData) return <p>Loading...</p>;

  const { albums, artists, song } = songData;

  return (
    <div>
      <h2>{song.song_title}</h2>
      <p>duration: {song.duration}</p>
      <p>views: {song.views}</p>

      <h3>Artists</h3>
      {artists.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <ul>
          {artists.map((artist) => (
            <li key={artist.artist_id}>
              {/* {artist.first_name} {artist.last_name} */}
              <Link to={`/artists/${artist.artist_id}`}>
                {artist.first_name} {artist.last_name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h3>Albums</h3>
      {albums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album.album_id}>
              {/* {album.album_title} ({album.release_year}) */}
              <Link to={`/albums/${album.album_id}`}>{album.album_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongDetail;
