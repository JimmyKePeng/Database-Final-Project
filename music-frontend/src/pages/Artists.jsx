import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../api";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/artists`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load artists");
          return;
        }

        setArtists(data);
      } catch (error) {
        console.error(error);
        setMessage("Server error");
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists.filter((artist) => {
    const fullName = `${artist.first_name} ${artist.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Artists</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {message && (
          <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {message}
          </p>
        )}

        {filteredArtists.length === 0 ? (
          <p className="text-gray-500">No artists found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArtists.map((artist) => (
              <div
                key={artist.artist_id}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  <Link
                    to={`/artists/${artist.artist_id}`}
                    className="no-underline transition hover:text-blue-600"
                  >
                    {artist.first_name} {artist.last_name}
                  </Link>
                </h3>

                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-800">
                      Country:
                    </span>{" "}
                    {artist.country}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Debut:</span>{" "}
                    {artist.debut_year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Artists;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API_BASE_URL from "../api";

// function Artists() {
//   const [artists, setArtists] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/artists`);
//         const data = await response.json();

//         if (!response.ok) {
//           setMessage(data.message || "Failed to load artists");
//           return;
//         }

//         setArtists(data);
//       } catch (error) {
//         console.error(error);
//         setMessage("Server error");
//       }
//     };

//     fetchArtists();
//   }, []);

//   return (
//     <div>
//       <h2>Artists</h2>
//       {message && <p>{message}</p>}

//       {artists.length === 0 ? (
//         <p>No artists found.</p>
//       ) : (
//         <ul>
//           {artists.map((artist) => (
//             <li key={artist.artist_id}>
//               <Link to={`/artists/${artist.artist_id}`}>
//                 {artist.first_name} {artist.last_name}
//               </Link>{" "}
//               - {artist.country}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Artists;
