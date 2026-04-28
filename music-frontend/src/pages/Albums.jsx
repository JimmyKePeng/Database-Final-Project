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
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Albums</h1>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {message}
          </p>
        )}

        {/* Albums Grid */}
        {filteredAlbums.length === 0 ? (
          <p className="text-gray-500">No albums found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAlbums.map((album) => (
              <div
                key={album.album_id}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  <Link
                    to={`/albums/${album.album_id}`}
                    className="no-underline transition hover:text-blue-600"
                  >
                    {album.album_title}
                  </Link>
                </h3>

                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Release Year:
                  </span>{" "}
                  {album.release_year}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
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
