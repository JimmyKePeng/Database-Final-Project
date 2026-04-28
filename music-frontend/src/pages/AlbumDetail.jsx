import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../api";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Album Header */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            {album.album_title}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Release Year:</span>{" "}
            {album.release_year}
          </p>
        </div>

        {/* Artists + Songs */}
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
    </div>
  );
}

export default AlbumDetail;
