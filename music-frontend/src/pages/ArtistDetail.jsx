import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../api";
import { Link } from "react-router-dom";
function ArtistDetail() {
  const { id } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/artists/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load artist");
          return;
        }

        setArtistData(data);
      } catch (error) {
        console.error(error);
        setMessage("Server error");
      }
    };

    fetchArtist();
  }, [id]);

  if (message) return <p>{message}</p>;
  if (!artistData) return <p>Loading...</p>;

  const { artist, albums, songs } = artistData;

  return (
    <div>
      <h2>
        {artist.first_name} {artist.last_name}
      </h2>
      <p>Country: {artist.country}</p>
      <p>Debut Year: {artist.debut_year}</p>
      <p>Email: {artist.email}</p>

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

      <h3>Songs</h3>
      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.song_id}>
              <Link to={`/songs/${song.song_id}`}>
                {song.song_title} - {song.duration}s -{song.views} views
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArtistDetail;
