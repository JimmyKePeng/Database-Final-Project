import { Link, useNavigate } from "react-router-dom";

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
    <nav
      style={{
        padding: "15px 20px",
        background: "#111",
        color: "white",
        display: "flex",
        gap: "15px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>

      <Link to="/artists" style={{ color: "white", textDecoration: "none" }}>
        Artists
      </Link>

      <Link to="/albums" style={{ color: "white", textDecoration: "none" }}>
        Albums
      </Link>

      <Link to="/songs" style={{ color: "white", textDecoration: "none" }}>
        Songs
      </Link>

      {user && (
        <Link
          to="/my-playlists"
          style={{ color: "white", textDecoration: "none" }}
        >
          My Playlists
        </Link>
      )}

      {artist && (
        <>
          <Link
            to="/artist-dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Artist Dashboard
          </Link>

          <Link
            to="/create-album"
            style={{ color: "white", textDecoration: "none" }}
          >
            Create Album
          </Link>

          <Link
            to="/create-song"
            style={{ color: "white", textDecoration: "none" }}
          >
            Create Song
          </Link>
        </>
      )}

      {!user && !artist ? (
        <>
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "auto",
            }}
          >
            User Login
          </Link>

          <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
            User Signup
          </Link>

          <Link
            to="/artist-login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Artist Login
          </Link>

          <Link
            to="/artist-signup"
            style={{ color: "white", textDecoration: "none" }}
          >
            Artist Signup
          </Link>
        </>
      ) : (
        <>
          <span style={{ marginLeft: "auto" }}>
            {user
              ? `Hi, ${user.username}`
              : `Hi, ${artist.first_name} ${artist.last_name}`}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </>
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
