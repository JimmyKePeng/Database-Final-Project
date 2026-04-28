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
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Artist */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {artist.first_name} {artist.last_name}
          </h1>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Country:</span> {artist.country}
            </p>
            <p>
              <span className="font-semibold">Debut Year:</span>{" "}
              {artist.debut_year}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {artist.email}
            </p>
          </div>
        </div>

        {/* Albums */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-900">
            Albums
          </h3>

          {albums.length === 0 ? (
            <p className="text-gray-500">No albums found.</p>
          ) : (
            <ul className="space-y-3">
              {albums.map((album) => (
                <li key={album.album_id}>
                  <Link
                    to={`/albums/${album.album_id}`}
                    className="block rounded-lg bg-gray-50 px-4 py-3 text-gray-800 transition hover:bg-gray-200 hover:text-black"
                  >
                    {album.album_title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Songs */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h3 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-900">
            Songs
          </h3>

          {songs.length === 0 ? (
            <p className="text-gray-500">No songs found.</p>
          ) : (
            <ul className="space-y-3">
              {songs.map((song) => (
                <li key={song.song_id}>
                  <Link
                    to={`/songs/${song.song_id}`}
                    className="block rounded-lg bg-gray-50 px-4 py-3 text-gray-800 transition hover:bg-gray-200 hover:text-black"
                  >
                    <span className="font-medium">{song.song_title}</span>
                    <div className="mt-1 text-sm text-gray-500">
                      {song.duration}s · {song.views} views
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;
