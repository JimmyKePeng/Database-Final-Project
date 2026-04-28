import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const artist = JSON.parse(localStorage.getItem("artist"));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="rounded-3xl bg-white px-8 py-12 shadow-lg">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Final Project
          </p>

          <h1 className="mb-4 text-5xl font-bold text-gray-900">Music App</h1>

          <p className="max-w-2xl text-xl leading-relaxed text-gray-600">
            Welcome to our music database final project. Browse artists, albums,
            and songs, explore details, and manage your playlists in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/artists">
              <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                Browse Artists
              </button>
            </Link>

            <Link to="/albums">
              <button className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700">
                Browse Albums
              </button>
            </Link>

            <Link to="/songs">
              <button className="rounded-xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700">
                Browse Songs
              </button>
            </Link>

            {user && (
              <Link to="/my-playlists">
                <button className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700">
                  My Playlists
                </button>
              </Link>
            )}

            {artist && (
              <Link to="/artist-dashboard">
                <button className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-black">
                  Artist Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Discover Artists
            </h2>
            <p className="text-gray-600">
              Search and explore artist profiles, countries, debut years, and
              connected albums and songs.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Explore Albums
            </h2>
            <p className="text-gray-600">
              View album details, release years, and see which artists and songs
              are connected to each album.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Manage Music
            </h2>
            <p className="text-gray-600">
              Create playlists as a user, or manage songs and albums from the
              artist dashboard.
            </p>
          </div>
        </div>

        {/* Optional logged-in message */}
        {(user || artist) && (
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="text-gray-600">
              {user
                ? `Logged in as ${user.username}. Jump back into your playlists and saved music.`
                : `Logged in as ${artist.first_name} ${artist.last_name}. Manage your albums and songs from your dashboard.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
