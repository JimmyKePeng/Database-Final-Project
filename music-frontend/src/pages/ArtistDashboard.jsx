import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../api";

function ArtistDashboard() {
  const artist = JSON.parse(localStorage.getItem("artist"));

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [editingSongId, setEditingSongId] = useState(null);

  const [albumForm, setAlbumForm] = useState({
    album_title: "",
    release_year: "",
  });

  const [songForm, setSongForm] = useState({
    song_title: "",
    album_id: "",
    duration: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!artist) return;
    fetchArtistAlbums();
    fetchArtistSongs();
  }, []);

  const fetchArtistAlbums = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/artists/${artist.artist_id}/albums`,
      );
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load albums");
        return;
      }

      setAlbums(data);
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const fetchArtistSongs = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/artists/${artist.artist_id}/songs`,
      );
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

  const startEditAlbum = (album) => {
    setEditingAlbumId(album.album_id);
    setAlbumForm({
      album_title: album.album_title,
      release_year: album.release_year,
    });
  };

  const saveAlbumEdit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/albums/${editingAlbumId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update album");
        return;
      }

      setEditingAlbumId(null);
      fetchArtistAlbums();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const deleteAlbum = async (albumId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to delete album");
        return;
      }

      fetchArtistAlbums();
      fetchArtistSongs();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const startEditSong = (song) => {
    setEditingSongId(song.song_id);
    setSongForm({
      song_title: song.song_title,
      album_id: song.album_id || "",
      duration: song.duration,
    });
  };

  const saveSongEdit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${editingSongId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...songForm,
          album_id: songForm.album_id ? Number(songForm.album_id) : null,
          duration: Number(songForm.duration),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update song");
        return;
      }

      setEditingSongId(null);
      fetchArtistSongs();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const deleteSong = async (songId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${songId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to delete song");
        return;
      }

      fetchArtistSongs();
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  if (!artist) {
    return <p>Please log in as an artist.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Artist Dashboard
          </h2>
          <p className="text-gray-600">
            Welcome,{" "}
            <span className="font-semibold text-gray-800">
              {artist.first_name} {artist.last_name}
            </span>
          </p>

          {message && (
            <p className="mt-4 rounded-lg bg-blue-100 px-4 py-3 text-blue-700">
              {message}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/create-album">
              <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
                Create Album
              </button>
            </Link>

            <Link to="/create-song">
              <button className="rounded-xl bg-purple-600 px-5 py-3 font-medium text-white transition hover:bg-purple-700">
                Create Song
              </button>
            </Link>
          </div>
        </div>

        {/* Albums Section */}
        <div>
          <h3 className="mb-5 text-2xl font-bold text-gray-900">My Albums</h3>

          {albums.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">No albums yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <div
                  key={album.album_id}
                  className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {editingAlbumId === album.album_id ? (
                    <div className="space-y-4">
                      <input
                        value={albumForm.album_title}
                        onChange={(e) =>
                          setAlbumForm((prev) => ({
                            ...prev,
                            album_title: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />

                      <input
                        type="number"
                        value={albumForm.release_year}
                        onChange={(e) =>
                          setAlbumForm((prev) => ({
                            ...prev,
                            release_year: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />

                      <div className="flex gap-3">
                        <button
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                          onClick={saveAlbumEdit}
                        >
                          Save
                        </button>
                        <button
                          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
                          onClick={() => setEditingAlbumId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        <Link
                          to={`/albums/${album.album_id}`}
                          className="transition hover:text-blue-600"
                        >
                          {album.album_title}
                        </Link>
                      </h3>

                      <p className="mb-4 text-gray-600">
                        <span className="font-semibold text-gray-800">
                          Release Year:
                        </span>{" "}
                        {album.release_year}
                      </p>

                      <div className="flex gap-3">
                        <button
                          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
                          onClick={() => startEditAlbum(album)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                          onClick={() => deleteAlbum(album.album_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Songs Section */}
        <div>
          <h3 className="mb-5 text-2xl font-bold text-gray-900">My Songs</h3>

          {songs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">No songs yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {songs.map((song) => (
                <div
                  key={song.song_id}
                  className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {editingSongId === song.song_id ? (
                    <div className="space-y-4">
                      <input
                        value={songForm.song_title}
                        onChange={(e) =>
                          setSongForm((prev) => ({
                            ...prev,
                            song_title: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />

                      <select
                        value={songForm.album_id}
                        onChange={(e) =>
                          setSongForm((prev) => ({
                            ...prev,
                            album_id: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">No Album</option>
                        {albums.map((album) => (
                          <option key={album.album_id} value={album.album_id}>
                            {album.album_title}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        value={songForm.duration}
                        onChange={(e) =>
                          setSongForm((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />

                      <div className="flex gap-3">
                        <button
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                          onClick={saveSongEdit}
                        >
                          Save
                        </button>
                        <button
                          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
                          onClick={() => setEditingSongId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {song.song_title}
                      </h3>

                      <div className="mb-4 space-y-1 text-gray-600">
                        <p>
                          <span className="font-semibold text-gray-800">
                            Album:
                          </span>{" "}
                          {song.album_title ? song.album_title : "No Album"}
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
                          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
                          onClick={() => startEditSong(song)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                          onClick={() => deleteSong(song.song_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistDashboard;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API_BASE_URL from "../api";

// function ArtistDashboard() {
//   const artist = JSON.parse(localStorage.getItem("artist"));

//   const [albums, setAlbums] = useState([]);
//   const [songs, setSongs] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!artist) return;

//     fetchArtistAlbums();
//     fetchArtistSongs();
//   }, []);

//   const fetchArtistAlbums = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/artists/${artist.artist_id}/albums`,
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Failed to load albums");
//         return;
//       }

//       setAlbums(data);
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error");
//     }
//   };

//   const fetchArtistSongs = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/artists/${artist.artist_id}/songs`,
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Failed to load songs");
//         return;
//       }

//       setSongs(data);
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error");
//     }
//   };

//   if (!artist) {
//     return <p>Please log in as an artist.</p>;
//   }

//   return (
//     <div>
//       <h2>Artist Dashboard</h2>
//       <p>
//         Welcome, {artist.first_name} {artist.last_name}
//       </p>
//       <p>Country: {artist.country || "N/A"}</p>
//       <p>Debut Year: {artist.debut_year || "N/A"}</p>

//       {message && <p>{message}</p>}

//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           marginBottom: "20px",
//           flexWrap: "wrap",
//         }}
//       >
//         <Link to="/create-album">
//           <button>Create Album</button>
//         </Link>
//         <Link to="/create-song">
//           <button>Create Song</button>
//         </Link>
//       </div>

//       <h3>My Albums</h3>
//       {albums.length === 0 ? (
//         <p>No albums yet.</p>
//       ) : (
//         <ul>
//           {albums.map((album) => (
//             <li key={album.album_id}>
//               <Link to={`/albums/${album.album_id}`}>{album.album_title}</Link>{" "}
//               ({album.release_year})
//             </li>
//           ))}
//         </ul>
//       )}

//       <h3>My Songs</h3>
//       {songs.length === 0 ? (
//         <p>No songs yet.</p>
//       ) : (
//         <ul>
//           {songs.map((song) => (
//             <li key={song.song_id}>
//               {song.song_title}
//               {song.album_title ? ` - ${song.album_title}` : " - No Album"}
//               {" - "}
//               {song.duration}s{" - "}
//               {song.views} views
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ArtistDashboard;
