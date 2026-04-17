import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArtistRoute from "./components/ArtistRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArtistSignup from "./pages/ArtistSignup";
import ArtistLogin from "./pages/ArtistLogin";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Songs from "./pages/Songs";
import MyPlaylists from "./pages/MyPlaylists";
import PlaylistDetail from "./pages/PlaylistDetail";
import CreateAlbum from "./pages/CreateAlbum";
import CreateSong from "./pages/CreateSong";
import ArtistDashboard from "./pages/ArtistDashboard";
import SongDetail from "./pages/SongDetail";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/artist-signup" element={<ArtistSignup />} />
          <Route path="/artist-login" element={<ArtistLogin />} />

          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />

          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />

          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/:id" element={<SongDetail />} />

          <Route path="/my-playlists" element={<MyPlaylists />} />
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
          <Route
            path="/artist-dashboard"
            element={
              <ArtistRoute>
                <ArtistDashboard />
              </ArtistRoute>
            }
          />
          <Route
            path="/create-album"
            element={
              <ArtistRoute>
                <CreateAlbum />
              </ArtistRoute>
            }
          />

          <Route
            path="/create-song"
            element={
              <ArtistRoute>
                <CreateSong />
              </ArtistRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Artists from "./pages/Artists";
// import ArtistDetail from "./pages/ArtistDetail";
// import Albums from "./pages/Albums";
// import AlbumDetail from "./pages/AlbumDetail";
// import Songs from "./pages/Songs";
// import MyPlaylists from "./pages/MyPlaylists";
// import PlaylistDetail from "./pages/PlaylistDetail";
// import CreateArtist from "./pages/CreateArtist";
// import CreateAlbum from "./pages/CreateAlbum";
// import CreateSong from "./pages/CreateSong";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/artists" element={<Artists />} />
//           <Route path="/artists/:id" element={<ArtistDetail />} />
//           <Route path="/albums" element={<Albums />} />
//           <Route path="/albums/:id" element={<AlbumDetail />} />
//           <Route path="/songs" element={<Songs />} />
//           <Route path="/my-playlists" element={<MyPlaylists />} />
//           <Route path="/playlists/:id" element={<PlaylistDetail />} />
//           <Route path="/create-artist" element={<CreateArtist />} />
//           <Route path="/create-album" element={<CreateAlbum />} />
//           <Route path="/create-song" element={<CreateSong />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Artists from "./pages/Artists";
// import ArtistDetail from "./pages/ArtistDetail";
// import MyPlaylists from "./pages/MyPlaylists";
// import PlaylistDetail from "./pages/PlaylistDetail";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/artists" element={<Artists />} />
//           <Route path="/artists/:id" element={<ArtistDetail />} />
//           <Route path="/my-playlists" element={<MyPlaylists />} />
//           <Route path="/playlists/:id" element={<PlaylistDetail />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
