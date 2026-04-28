import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const artist = JSON.parse(localStorage.getItem("artist"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("artist");
    navigate("/");
  };
  return (
    <nav className="flex flex-wrap items-center gap-4 bg-black px-5 py-4 text-2xl text-white">
      <Link to="/" className="no-underline hover:text-gray-300 transition">
        Home
      </Link>

      <Link
        to="/artists"
        className="no-underline hover:text-gray-300 transition"
      >
        Artists
      </Link>

      <Link
        to="/albums"
        className="no-underline hover:text-gray-300 transition"
      >
        Albums
      </Link>

      <Link to="/songs" className="no-underline hover:text-gray-300 transition">
        Songs
      </Link>

      {user && (
        <Link
          to="/my-playlists"
          className="no-underline hover:text-gray-300 transition"
        >
          My Playlists
        </Link>
      )}

      {artist && (
        <>
          <Link
            to="/artist-dashboard"
            className="no-underline hover:text-gray-300 transition"
          >
            Artist Dashboard
          </Link>

          <Link
            to="/create-album"
            className="no-underline hover:text-gray-300 transition"
          >
            Create Album
          </Link>

          <Link
            to="/create-song"
            className="no-underline hover:text-gray-300 transition"
          >
            Create Song
          </Link>
        </>
      )}

      {!user && !artist ? (
        <div className="ml-auto flex flex-wrap items-center gap-4">
          <Link
            to="/login"
            className="no-underline hover:text-gray-300 transition"
          >
            User Login
          </Link>

          <Link
            to="/signup"
            className="no-underline hover:text-gray-300 transition"
          >
            User Signup
          </Link>

          <Link
            to="/artist-login"
            className="no-underline hover:text-gray-300 transition"
          >
            Artist Login
          </Link>

          <Link
            to="/artist-signup"
            className="no-underline hover:text-gray-300 transition"
          >
            Artist Signup
          </Link>
        </div>
      ) : (
        <div className="ml-auto flex items-center gap-3">
          <span className="text-m text-gray-300">
            {user
              ? `Hi, ${user.username}`
              : `Hi, ${artist.first_name} ${artist.last_name}`}
          </span>

          <button
            onClick={handleLogout}
            className="rounded border border-white px-3 py-1 text-3xl hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav
//       style={{
//         padding: "15px 20px",
//         background: "#111",
//         color: "white",
//         display: "flex",
//         gap: "15px",
//         alignItems: "center",
//         flexWrap: "wrap",
//       }}
//     >
//       <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//         Home
//       </Link>

//       <Link to="/artists" style={{ color: "white", textDecoration: "none" }}>
//         Artists
//       </Link>

//       <Link to="/albums" style={{ color: "white", textDecoration: "none" }}>
//         Albums
//       </Link>

//       <Link to="/songs" style={{ color: "white", textDecoration: "none" }}>
//         Songs
//       </Link>

//       <Link
//         to="/create-artist"
//         style={{ color: "white", textDecoration: "none" }}
//       >
//         Create Artist
//       </Link>

//       <Link
//         to="/create-album"
//         style={{ color: "white", textDecoration: "none" }}
//       >
//         Create Album
//       </Link>

//       <Link
//         to="/create-song"
//         style={{ color: "white", textDecoration: "none" }}
//       >
//         Create Song
//       </Link>

//       {user ? (
//         <>
//           <Link
//             to="/my-playlists"
//             style={{
//               color: "white",
//               textDecoration: "none",
//               marginLeft: "auto",
//             }}
//           >
//             My Playlists
//           </Link>
//           <span>Hi, {user.username}</span>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link
//             to="/login"
//             style={{
//               color: "white",
//               textDecoration: "none",
//               marginLeft: "auto",
//             }}
//           >
//             Login
//           </Link>
//           <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
//             Signup
//           </Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav
//       style={{
//         padding: "15px 20px",
//         background: "#111",
//         color: "white",
//         display: "flex",
//         gap: "15px",
//         alignItems: "center",
//       }}
//     >
//       <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//         Home
//       </Link>
//       <Link to="/artists" style={{ color: "white", textDecoration: "none" }}>
//         Artists
//       </Link>

//       {user ? (
//         <>
//           <Link
//             to="/my-playlists"
//             style={{ color: "white", textDecoration: "none" }}
//           >
//             My Playlists
//           </Link>
//           <span style={{ marginLeft: "auto" }}>Hi, {user.username}</span>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link
//             to="/login"
//             style={{
//               color: "white",
//               textDecoration: "none",
//               marginLeft: "auto",
//             }}
//           >
//             Login
//           </Link>
//           <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
//             Signup
//           </Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
