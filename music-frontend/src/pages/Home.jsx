import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const artist = JSON.parse(localStorage.getItem("artist"));

  return (
    <div className="page">
      <h1>Music App</h1>
      <p>Welcome to your music database final project.</p>
      <p>Browse artists, albums, songs, and manage playlists.</p>

      <div className="action-row" style={{ marginTop: "20px" }}>
        <Link to="/artists">
          <button className="primary-btn">Browse Artists</button>
        </Link>
        <Link to="/albums">
          <button className="primary-btn">Browse Albums</button>
        </Link>
        <Link to="/songs">
          <button className="primary-btn">Browse Songs</button>
        </Link>

        {user && (
          <Link to="/my-playlists">
            <button className="secondary-btn">My Playlists</button>
          </Link>
        )}

        {artist && (
          <Link to="/artist-dashboard">
            <button className="secondary-btn">Artist Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div>
//       <h1>Music App</h1>
//       <p>Welcome to your music database final project.</p>
//       <p>Browse artists, albums, songs, and manage playlists.</p>

//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           flexWrap: "wrap",
//           marginTop: "20px",
//         }}
//       >
//         <Link to="/artists">
//           <button>Browse Artists</button>
//         </Link>
//         <Link to="/albums">
//           <button>Browse Albums</button>
//         </Link>
//         <Link to="/songs">
//           <button>Browse Songs</button>
//         </Link>
//         <Link to="/my-playlists">
//           <button>My Playlists</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Home;
