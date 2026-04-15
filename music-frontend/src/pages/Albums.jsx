import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../api";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/albums`);
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

    fetchAlbums();
  }, []);

  const filteredAlbums = albums.filter((album) =>
    album.album_title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="page">
      <h2>Albums</h2>

      <input
        type="text"
        placeholder="Search albums..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {message && <p>{message}</p>}

      {filteredAlbums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        <div className="card-grid">
          {filteredAlbums.map((album) => (
            <div key={album.album_id} className="card">
              <h3>
                <Link to={`/albums/${album.album_id}`}>
                  {album.album_title}
                </Link>
              </h3>
              <p>Release Year: {album.release_year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API_BASE_URL from "../api";

// function Albums() {
//   const [albums, setAlbums] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/albums`);
//         const data = await response.json();

//         if (!response.ok) {
//           setMessage(data.message || "Failed to load albums");
//           return;
//         }

//         setAlbums(data);
//       } catch (error) {
//         console.error(error);
//         setMessage("Server error");
//       }
//     };

//     fetchAlbums();
//   }, []);

//   return (
//     <div>
//       <h2>Albums</h2>
//       {message && <p>{message}</p>}

//       {albums.length === 0 ? (
//         <p>No albums found.</p>
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
//     </div>
//   );
// }

// export default Albums;
