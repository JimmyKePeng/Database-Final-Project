import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE_URL from "../api";

function CreateSong() {
  const artist = JSON.parse(localStorage.getItem("artist"));

  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    song_title: "",
    album_id: "",
    duration: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
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
  // const fetchAlbums = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/albums`);
  //     const data = await response.json();

  //     if (!response.ok) {
  //       setMessage(data.message || "Failed to load albums");
  //       return;
  //     }

  //     setAlbums(data);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Server error");
  //   }
  // };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_title: formData.song_title,
          album_id: formData.album_id ? Number(formData.album_id) : null,
          duration: Number(formData.duration),
          artist_ids: [artist.artist_id],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create song");
        return;
      }

      setMessage("Song created successfully");
      setFormData({
        song_title: "",
        album_id: "",
        duration: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Create Song</h2>
      <p>
        Logged in as: {artist.first_name} {artist.last_name}
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="song_title"
          placeholder="Song Title"
          value={formData.song_title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <select
          name="album_id"
          value={formData.album_id}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
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
          name="duration"
          placeholder="Duration in seconds"
          value={formData.duration}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button type="submit">Create Song</button>
      </form>

      {message && <p>{message}</p>}

      <div style={{ marginTop: "15px" }}>
        <Link to="/artist-dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default CreateSong;
// import { useEffect, useState } from "react";
// import API_BASE_URL from "../api";

// function CreateSong() {
//   const artist = JSON.parse(localStorage.getItem("artist"));

//   const [albums, setAlbums] = useState([]);
//   const [formData, setFormData] = useState({
//     song_title: "",
//     album_id: "",
//     duration: "",
//   });
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   const fetchAlbums = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/albums`);
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

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/songs`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           song_title: formData.song_title,
//           album_id: formData.album_id ? Number(formData.album_id) : null,
//           duration: Number(formData.duration),
//           artist_ids: [artist.artist_id],
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Failed to create song");
//         return;
//       }

//       setMessage("Song created successfully");
//       setFormData({
//         song_title: "",
//         album_id: "",
//         duration: "",
//       });
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Song</h2>
//       <p>
//         Logged in as: {artist.first_name} {artist.last_name}
//       </p>

//       <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
//         <input
//           type="text"
//           name="song_title"
//           placeholder="Song Title"
//           value={formData.song_title}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//         />

//         <select
//           name="album_id"
//           value={formData.album_id}
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//         >
//           <option value="">No Album</option>
//           {albums.map((album) => (
//             <option key={album.album_id} value={album.album_id}>
//               {album.album_title}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           name="duration"
//           placeholder="Duration in seconds"
//           value={formData.duration}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//         />

//         <button type="submit">Create Song</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default CreateSong;
// // import { useEffect, useState } from "react";
// // import API_BASE_URL from "../api";

// // function CreateSong() {
// //   const [albums, setAlbums] = useState([]);
// //   const [artists, setArtists] = useState([]);
// //   const [formData, setFormData] = useState({
// //     song_title: "",
// //     album_id: "",
// //     duration: "",
// //     artist_ids: [],
// //   });
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     fetchAlbums();
// //     fetchArtists();
// //   }, []);

// //   const fetchAlbums = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/albums`);
// //       const data = await response.json();

// //       if (!response.ok) {
// //         setMessage(data.message || "Failed to load albums");
// //         return;
// //       }

// //       setAlbums(data);
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("Server error");
// //     }
// //   };

// //   const fetchArtists = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/artists`);
// //       const data = await response.json();

// //       if (!response.ok) {
// //         setMessage(data.message || "Failed to load artists");
// //         return;
// //       }

// //       setArtists(data);
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("Server error");
// //     }
// //   };

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleArtistChange = (artistId) => {
// //     setFormData((prev) => {
// //       const exists = prev.artist_ids.includes(artistId);

// //       if (exists) {
// //         return {
// //           ...prev,
// //           artist_ids: prev.artist_ids.filter((id) => id !== artistId),
// //         };
// //       }

// //       return {
// //         ...prev,
// //         artist_ids: [...prev.artist_ids, artistId],
// //       };
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("");

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/songs`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           song_title: formData.song_title,
// //           album_id: formData.album_id ? Number(formData.album_id) : null,
// //           duration: Number(formData.duration),
// //           artist_ids: formData.artist_ids,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         setMessage(data.message || "Failed to create song");
// //         return;
// //       }

// //       setMessage("Song created successfully");
// //       setFormData({
// //         song_title: "",
// //         album_id: "",
// //         duration: "",
// //         artist_ids: [],
// //       });
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("Server error");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Create Song</h2>

// //       <form onSubmit={handleSubmit}>
// //         <div style={{ maxWidth: "400px" }}>
// //           <input
// //             type="text"
// //             name="song_title"
// //             placeholder="Song Title"
// //             value={formData.song_title}
// //             onChange={handleChange}
// //             required
// //             style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
// //           />

// //           <select
// //             name="album_id"
// //             value={formData.album_id}
// //             onChange={handleChange}
// //             style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
// //           >
// //             <option value="">No Album</option>
// //             {albums.map((album) => (
// //               <option key={album.album_id} value={album.album_id}>
// //                 {album.album_title}
// //               </option>
// //             ))}
// //           </select>

// //           <input
// //             type="number"
// //             name="duration"
// //             placeholder="Duration in seconds"
// //             value={formData.duration}
// //             onChange={handleChange}
// //             required
// //             style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
// //           />
// //         </div>

// //         <h3>Select Artists</h3>
// //         {artists.map((artist) => (
// //           <label
// //             key={artist.artist_id}
// //             style={{ display: "block", marginBottom: "8px" }}
// //           >
// //             <input
// //               type="checkbox"
// //               checked={formData.artist_ids.includes(artist.artist_id)}
// //               onChange={() => handleArtistChange(artist.artist_id)}
// //             />{" "}
// //             {artist.first_name} {artist.last_name}
// //           </label>
// //         ))}

// //         <button type="submit" style={{ marginTop: "10px" }}>
// //           Create Song
// //         </button>
// //       </form>

// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // }

// // export default CreateSong;
