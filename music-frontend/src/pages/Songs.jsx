import { useEffect, useState } from "react";
import API_BASE_URL from "../api";

function Songs() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [songs, setSongs] = useState([]);
  const [likedSongIds, setLikedSongIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSongs();

    if (user) {
      fetchLikedSongs();
    }
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs`);
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

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${user.user_id}/liked-songs`,
      );
      const data = await response.json();

      if (!response.ok) return;

      setLikedSongIds(data.map((item) => item.song_id));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaySong = async (songId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${songId}/view`, {
        method: "PUT",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update views");
        return;
      }

      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.song_id === songId ? { ...song, views: data.song.views } : song,
        ),
      );
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleLikeToggle = async (songId) => {
    if (!user) {
      setMessage("Please log in to like songs");
      return;
    }

    const alreadyLiked = likedSongIds.includes(songId);

    try {
      const response = await fetch(
        alreadyLiked
          ? `${API_BASE_URL}/songs/${songId}/like/${user.user_id}`
          : `${API_BASE_URL}/songs/${songId}/like`,
        {
          method: alreadyLiked ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: alreadyLiked
            ? undefined
            : JSON.stringify({ user_id: user.user_id }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update like");
        return;
      }

      if (alreadyLiked) {
        setLikedSongIds((prev) => prev.filter((id) => id !== songId));
      } else {
        setLikedSongIds((prev) => [...prev, songId]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const filteredSongs = songs.filter((song) => {
    const target = `${song.song_title} ${song.album_title || ""}`.toLowerCase();
    return target.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="page">
      <h2>Songs</h2>

      <input
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {message && <p>{message}</p>}

      {filteredSongs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <div className="card-grid">
          {filteredSongs.map((song) => {
            const isLiked = likedSongIds.includes(song.song_id);

            return (
              <div key={song.song_id} className="card">
                <h3>{song.song_title}</h3>
                <p>
                  {song.album_title ? `Album: ${song.album_title}` : "No Album"}
                </p>
                <p>Duration: {song.duration}s</p>
                <p>Views: {song.views}</p>
                <button
                  className="secondary-btn"
                  onClick={() => handlePlaySong(song.song_id)}
                >
                  Play
                </button>
                <button
                  className={isLiked ? "danger-btn" : "primary-btn"}
                  onClick={() => handleLikeToggle(song.song_id)}
                >
                  {isLiked ? "Unlike" : "Like"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Songs;
// import { useEffect, useState } from "react";
// import API_BASE_URL from "../api";

// function Songs() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [songs, setSongs] = useState([]);
//   const [likedSongIds, setLikedSongIds] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchSongs();

//     if (user) {
//       fetchLikedSongs();
//     }
//   }, []);

//   const fetchSongs = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/songs`);
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

//   const fetchLikedSongs = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/users/${user.user_id}/liked-songs`,
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         return;
//       }

//       setLikedSongIds(data.map((item) => item.song_id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLikeToggle = async (songId) => {
//     if (!user) {
//       setMessage("Please log in to like songs");
//       return;
//     }

//     const alreadyLiked = likedSongIds.includes(songId);

//     try {
//       const response = await fetch(
//         alreadyLiked
//           ? `${API_BASE_URL}/songs/${songId}/like/${user.user_id}`
//           : `${API_BASE_URL}/songs/${songId}/like`,
//         {
//           method: alreadyLiked ? "DELETE" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: alreadyLiked
//             ? undefined
//             : JSON.stringify({ user_id: user.user_id }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Failed to update like");
//         return;
//       }

//       if (alreadyLiked) {
//         setLikedSongIds((prev) => prev.filter((id) => id !== songId));
//       } else {
//         setLikedSongIds((prev) => [...prev, songId]);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error");
//     }
//   };

//   return (
//     <div>
//       <h2>Songs</h2>
//       {message && <p>{message}</p>}

//       {songs.length === 0 ? (
//         <p>No songs found.</p>
//       ) : (
//         <ul>
//           {songs.map((song) => {
//             const isLiked = likedSongIds.includes(song.song_id);

//             return (
//               <li key={song.song_id} style={{ marginBottom: "10px" }}>
//                 <strong>{song.song_title}</strong>
//                 {song.album_title ? ` - Album: ${song.album_title}` : ""}
//                 {" - "}
//                 {song.duration}s - {song.views} views
//                 <button
//                   onClick={() => handleLikeToggle(song.song_id)}
//                   style={{ marginLeft: "10px" }}
//                 >
//                   {isLiked ? "Unlike" : "Like"}
//                 </button>
//               </li>
//               // <li key={song.song_id} style={{ marginBottom: "10px" }}>
//               //   <strong>{song.song_title}</strong> - {song.duration}s -{" "}
//               //   {song.views} views
//               //   <button
//               //     onClick={() => handleLikeToggle(song.song_id)}
//               //     style={{ marginLeft: "10px" }}
//               //   >
//               //     {isLiked ? "Unlike" : "Like"}
//               //   </button>
//               // </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Songs;
