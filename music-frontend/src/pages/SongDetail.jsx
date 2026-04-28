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
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Song Header */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">
            {song.song_title}
          </h2>

          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Duration:</span>{" "}
              {song.duration}s
            </p>
            <p>
              <span className="font-semibold text-gray-800">Views:</span>{" "}
              {song.views}
            </p>
          </div>
        </div>

        {/* Artists + Albums */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Artists */}
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-900">
              Artists
            </h3>

            {artists.length === 0 ? (
              <p className="text-gray-500">No artists found.</p>
            ) : (
              <ul className="space-y-3">
                {artists.map((artist) => (
                  <li key={artist.artist_id}>
                    <Link
                      to={`/artists/${artist.artist_id}`}
                      className="block rounded-lg bg-gray-50 px-4 py-3 text-gray-800 transition hover:bg-gray-200 hover:text-black"
                    >
                      {artist.first_name} {artist.last_name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
