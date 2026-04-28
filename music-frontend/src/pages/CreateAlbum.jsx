import { Link } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../api";

function CreateAlbum() {
  const artist = JSON.parse(localStorage.getItem("artist"));

  const [formData, setFormData] = useState({
    album_title: "",
    release_year: "",
  });

  const [message, setMessage] = useState("");

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
      const response = await fetch(`${API_BASE_URL}/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          album_title: formData.album_title,
          release_year: Number(formData.release_year),
          artist_ids: [artist.artist_id],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create album");
        return;
      }

      setMessage("Album created successfully");
      setFormData({
        album_title: "",
        release_year: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Create Album</h2>

        <p className="mb-6 text-gray-600">
          Logged in as:{" "}
          <span className="font-semibold text-gray-800">
            {artist.first_name} {artist.last_name}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="album_title"
            placeholder="Album Title"
            value={formData.album_title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="number"
            name="release_year"
            placeholder="Release Year"
            value={formData.release_year}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Create Album
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-lg bg-blue-100 px-4 py-3 text-blue-700">
            {message}
          </p>
        )}

        <div className="mt-6">
          <Link
            to="/artist-dashboard"
            className="font-medium text-blue-600 no-underline transition hover:text-blue-800"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbum;
// import { useState } from "react";
// import API_BASE_URL from "../api";
// import { Link } from "react-router-dom";

// function CreateAlbum() {
//   const artist = JSON.parse(localStorage.getItem("artist"));

//   const [formData, setFormData] = useState({
//     album_title: "",
//     release_year: "",
//   });

//   const [message, setMessage] = useState("");

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
//       const response = await fetch(`${API_BASE_URL}/albums`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           album_title: formData.album_title,
//           release_year: Number(formData.release_year),
//           artist_ids: [artist.artist_id],
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Failed to create album");
//         return;
//       }

//       setMessage("Album created successfully");
//       setFormData({
//         album_title: "",
//         release_year: "",
//       });
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Album</h2>
//       <p>
//         Logged in as: {artist.first_name} {artist.last_name}
//       </p>

//       <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
//         <input
//           type="text"
//           name="album_title"
//           placeholder="Album Title"
//           value={formData.album_title}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//         />

//         <input
//           type="number"
//           name="release_year"
//           placeholder="Release Year"
//           value={formData.release_year}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//         />

//         <button type="submit">Create Album</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default CreateAlbum;
// // import { useEffect, useState } from "react";
// // import API_BASE_URL from "../api";

// // function CreateAlbum() {
// //   const [artists, setArtists] = useState([]);
// //   const [formData, setFormData] = useState({
// //     album_title: "",
// //     release_year: "",
// //     artist_ids: [],
// //   });
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     fetchArtists();
// //   }, []);

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
// //       const response = await fetch(`${API_BASE_URL}/albums`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           album_title: formData.album_title,
// //           release_year: Number(formData.release_year),
// //           artist_ids: formData.artist_ids,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         setMessage(data.message || "Failed to create album");
// //         return;
// //       }

// //       setMessage("Album created successfully");
// //       setFormData({
// //         album_title: "",
// //         release_year: "",
// //         artist_ids: [],
// //       });
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("Server error");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Create Album</h2>

// //       <form onSubmit={handleSubmit}>
// //         <div style={{ maxWidth: "400px" }}>
// //           <input
// //             type="text"
// //             name="album_title"
// //             placeholder="Album Title"
// //             value={formData.album_title}
// //             onChange={handleChange}
// //             required
// //             style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
// //           />

// //           <input
// //             type="number"
// //             name="release_year"
// //             placeholder="Release Year"
// //             value={formData.release_year}
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
// //           Create Album
// //         </button>
// //       </form>

// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // }

// // export default CreateAlbum;
