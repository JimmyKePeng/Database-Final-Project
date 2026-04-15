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
    <div className="page">
      <h2>Artists</h2>

      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {message && <p>{message}</p>}

      {filteredArtists.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <div className="card-grid">
          {filteredArtists.map((artist) => (
            <div key={artist.artist_id} className="card">
              <h3>
                <Link to={`/artists/${artist.artist_id}`}>
                  {artist.first_name} {artist.last_name}
                </Link>
              </h3>
              <p>{artist.country}</p>
              <p>Debut: {artist.debut_year}</p>
            </div>
          ))}
        </div>
      )}
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
