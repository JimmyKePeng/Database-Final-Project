import { Navigate } from "react-router-dom";

function ArtistRoute({ children }) {
  const artist = JSON.parse(localStorage.getItem("artist"));

  if (!artist) {
    return <Navigate to="/artist-login" replace />;
  }

  return children;
}

export default ArtistRoute;
