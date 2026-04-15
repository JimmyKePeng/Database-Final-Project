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
    <div className="page">
      <h2>Artist Dashboard</h2>
      <p>
        Welcome, {artist.first_name} {artist.last_name}
      </p>

      {message && <p>{message}</p>}

      <div className="action-row">
        <Link to="/create-album">
          <button className="primary-btn">Create Album</button>
        </Link>
        <Link to="/create-song">
          <button className="primary-btn">Create Song</button>
        </Link>
      </div>

      <h3>My Albums</h3>
      {albums.length === 0 ? (
        <p>No albums yet.</p>
      ) : (
        <div className="card-grid">
          {albums.map((album) => (
            <div key={album.album_id} className="card">
              {editingAlbumId === album.album_id ? (
                <>
                  <input
                    value={albumForm.album_title}
                    onChange={(e) =>
                      setAlbumForm((prev) => ({
                        ...prev,
                        album_title: e.target.value,
                      }))
                    }
                    className="form-input"
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
                    className="form-input"
                  />
                  <div className="action-row">
                    <button className="primary-btn" onClick={saveAlbumEdit}>
                      Save
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => setEditingAlbumId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>
                    <Link to={`/albums/${album.album_id}`}>
                      {album.album_title}
                    </Link>
                  </h3>
                  <p>{album.release_year}</p>
                  <div className="action-row">
                    <button
                      className="secondary-btn"
                      onClick={() => startEditAlbum(album)}
                    >
                      Edit
                    </button>
                    <button
                      className="danger-btn"
                      onClick={() => deleteAlbum(album.album_id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <h3>My Songs</h3>
      {songs.length === 0 ? (
        <p>No songs yet.</p>
      ) : (
        <div className="card-grid">
          {songs.map((song) => (
            <div key={song.song_id} className="card">
              {editingSongId === song.song_id ? (
                <>
                  <input
                    value={songForm.song_title}
                    onChange={(e) =>
                      setSongForm((prev) => ({
                        ...prev,
                        song_title: e.target.value,
                      }))
                    }
                    className="form-input"
                  />

                  <select
                    value={songForm.album_id}
                    onChange={(e) =>
                      setSongForm((prev) => ({
                        ...prev,
                        album_id: e.target.value,
                      }))
                    }
                    className="form-input"
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
                    className="form-input"
                  />

                  <div className="action-row">
                    <button className="primary-btn" onClick={saveSongEdit}>
                      Save
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => setEditingSongId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{song.song_title}</h3>
                  <p>
                    {song.album_title
                      ? `Album: ${song.album_title}`
                      : "No Album"}
                  </p>
                  <p>Duration: {song.duration}s</p>
                  <p>Views: {song.views}</p>
                  <div className="action-row">
                    <button
                      className="secondary-btn"
                      onClick={() => startEditSong(song)}
                    >
                      Edit
                    </button>
                    <button
                      className="danger-btn"
                      onClick={() => deleteSong(song.song_id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
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
