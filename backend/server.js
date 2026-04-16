const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* ---------------------------
   AUTH - USER SIGNUP / LOGIN
---------------------------- */

//user sign up, add user's info into database
app.post("/api/users/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO Users (email, username, password_hash, signup_date)
       VALUES (?, ?, ?, CURDATE())`,
      [email, username, hashedPassword],
    );

    res.status(201).json({
      message: "User created successfully",
      user_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// user login, check user email and password
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute(`SELECT * FROM Users WHERE email = ?`, [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ---------------------------
   ARTISTS
---------------------------- */

// get the specific artists id albums
app.get("/api/artists/:id/albums", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT a.album_id, a.album_title, a.release_year
       FROM Albums a
       JOIN Artist_Album aa ON a.album_id = aa.album_id
       WHERE aa.artist_id = ?
       ORDER BY a.release_year DESC, a.album_title ASC`,
      [id],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch artist albums" });
  }
});

// get the specific artists id songs
app.get("/api/artists/:id/songs", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT s.song_id, s.song_title, s.duration, s.views, s.album_id, a.album_title
       FROM Songs s
       JOIN Artist_Song ars ON s.song_id = ars.song_id
       LEFT JOIN Albums a ON s.album_id = a.album_id
       WHERE ars.artist_id = ?
       ORDER BY s.song_title ASC`,
      [id],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch artist songs" });
  }
});

// get all the artist's info
app.get("/api/artists", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT artist_id, first_name, last_name, country, debut_year, email
       FROM Artists`,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch artists" });
  }
});

// add a new artists into database
app.post("/api/artists", async (req, res) => {
  try {
    const { email, password, first_name, last_name, country, debut_year } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO Artists (email, password_hash, first_name, last_name, country, debut_year)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, first_name, last_name, country, debut_year],
    );

    res.status(201).json({
      message: "Artist created",
      artist_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create artist" });
  }
});

// get the artist info/albums/songs base on the artists id
app.get("/api/artists/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [artistRows] = await db.execute(
      `SELECT artist_id, first_name, last_name, country, debut_year, email
       FROM Artists
       WHERE artist_id = ?`,
      [id],
    );

    if (artistRows.length === 0) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const [albums] = await db.execute(
      `SELECT a.album_id, a.album_title, a.release_year
       FROM Albums a
       JOIN Artist_Album aa ON a.album_id = aa.album_id
       WHERE aa.artist_id = ?`,
      [id],
    );

    const [songs] = await db.execute(
      `SELECT s.song_id, s.song_title, s.duration, s.views
       FROM Songs s
       JOIN Artist_Song ars ON s.song_id = ars.song_id
       WHERE ars.artist_id = ?`,
      [id],
    );

    res.json({
      artist: artistRows[0],
      albums,
      songs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch artist details" });
  }
});

// artist log in, check email and password
app.post("/api/artists/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute(`SELECT * FROM Artists WHERE email = ?`, [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const artist = rows[0];
    const isMatch = await bcrypt.compare(password, artist.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Artist login successful",
      artist: {
        artist_id: artist.artist_id,
        email: artist.email,
        first_name: artist.first_name,
        last_name: artist.last_name,
        country: artist.country,
        debut_year: artist.debut_year,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during artist login" });
  }
});

/* ---------------------------
   ALBUMS
---------------------------- */

// edit an albums on database
app.put("/api/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { album_title, release_year } = req.body;

    await db.execute(
      `UPDATE Albums
       SET album_title = ?, release_year = ?
       WHERE album_id = ?`,
      [album_title, release_year, id],
    );

    res.json({ message: "Album updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update album" });
  }
});

// delete an albums based on  the albums id
app.delete("/api/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(`DELETE FROM Albums WHERE album_id = ?`, [id]);

    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete album" });
  }
});

//get all albums
app.get("/api/albums", async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM Albums`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch albums" });
  }
});

//add a new albums to database
app.post("/api/albums", async (req, res) => {
  try {
    const { album_title, release_year, artist_ids } = req.body;

    const [albumResult] = await db.execute(
      `INSERT INTO Albums (album_title, release_year)
       VALUES (?, ?)`,
      [album_title, release_year],
    );

    const albumId = albumResult.insertId;

    if (Array.isArray(artist_ids)) {
      for (const artistId of artist_ids) {
        await db.execute(
          `INSERT INTO Artist_Album (artist_id, album_id)
           VALUES (?, ?)`,
          [artistId, albumId],
        );
      }
    }

    res.status(201).json({
      message: "Album created",
      album_id: albumId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create album" });
  }
});

//get albums info/artists/songs based on the album id
app.get("/api/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [albumRows] = await db.execute(
      `SELECT * FROM Albums WHERE album_id = ?`,
      [id],
    );

    if (albumRows.length === 0) {
      return res.status(404).json({ message: "Album not found" });
    }

    const [artists] = await db.execute(
      `SELECT ar.artist_id, ar.first_name, ar.last_name
       FROM Artists ar
       JOIN Artist_Album aa ON ar.artist_id = aa.artist_id
       WHERE aa.album_id = ?`,
      [id],
    );

    const [songs] = await db.execute(
      `SELECT song_id, song_title, duration, views
       FROM Songs
       WHERE album_id = ?`,
      [id],
    );

    res.json({
      album: albumRows[0],
      artists,
      songs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch album details" });
  }
});

/* ---------------------------
   SONGS
---------------------------- */

// increase the view of a song after someone play it
app.put("/api/songs/:id/view", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      `UPDATE Songs
       SET views = views + 1
       WHERE song_id = ?`,
      [id],
    );

    const [rows] = await db.execute(
      `SELECT song_id, song_title, views
       FROM Songs
       WHERE song_id = ?`,
      [id],
    );

    res.json({
      message: "Song view count updated",
      song: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update song views" });
  }
});

// update a song infor with song id
app.put("/api/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { song_title, album_id, duration } = req.body;

    await db.execute(
      `UPDATE Songs
       SET song_title = ?, album_id = ?, duration = ?
       WHERE song_id = ?`,
      [song_title, album_id || null, duration, id],
    );

    res.json({ message: "Song updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update song" });
  }
});

// delete a song with song id
app.delete("/api/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(`DELETE FROM Songs WHERE song_id = ?`, [id]);

    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete song" });
  }
});

// get all songs
app.get("/api/songs", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT s.song_id, s.song_title, s.duration, s.views, s.album_id, a.album_title
       FROM Songs s
       LEFT JOIN Albums a ON s.album_id = a.album_id
       ORDER BY s.song_title ASC`,
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch songs" });
  }
});

//add a new song into database
app.post("/api/songs", async (req, res) => {
  try {
    const { song_title, album_id, duration, artist_ids } = req.body;

    const [songResult] = await db.execute(
      `INSERT INTO Songs (song_title, album_id, duration, views)
       VALUES (?, ?, ?, 0)`,
      [song_title, album_id || null, duration],
    );

    const songId = songResult.insertId;

    if (Array.isArray(artist_ids)) {
      for (const artistId of artist_ids) {
        await db.execute(
          `INSERT INTO Artist_Song (artist_id, song_id)
           VALUES (?, ?)`,
          [artistId, songId],
        );
      }
    }

    res.status(201).json({
      message: "Song created",
      song_id: songId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create song" });
  }
});

//get a song info with song id
app.get("/api/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [songRows] = await db.execute(
      `SELECT * FROM Songs WHERE song_id = ?`,
      [id],
    );

    if (songRows.length === 0) {
      return res.status(404).json({ message: "Song not found" });
    }

    const [artists] = await db.execute(
      `SELECT ar.artist_id, ar.first_name, ar.last_name
       FROM Artists ar
       JOIN Artist_Song ars ON ar.artist_id = ars.artist_id
       WHERE ars.song_id = ?`,
      [id],
    );

    res.json({
      song: songRows[0],
      artists,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch song details" });
  }
});

/* ---------------------------
   PLAYLISTS
---------------------------- */

// add a new playlist for a user
app.post("/api/playlists", async (req, res) => {
  try {
    const { user_id, playlist_name } = req.body;

    const [result] = await db.execute(
      `INSERT INTO Playlists (user_id, playlist_name, created_date)
       VALUES (?, ?, CURDATE())`,
      [user_id, playlist_name],
    );

    res.status(201).json({
      message: "Playlist created",
      playlist_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create playlist" });
  }
});

// user's playlist based on user id
app.get("/api/users/:userId/playlists", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.execute(
      `SELECT * FROM Playlists WHERE user_id = ?`,
      [userId],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch playlists" });
  }
});

// get playlist info/songs with playlist id
app.get("/api/playlists/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [playlistRows] = await db.execute(
      `SELECT * FROM Playlists WHERE playlist_id = ?`,
      [id],
    );

    if (playlistRows.length === 0) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const [songs] = await db.execute(
      `SELECT s.song_id, s.song_title, s.duration, s.views, ps.position, ps.added_at
       FROM Playlist_Song ps
       JOIN Songs s ON ps.song_id = s.song_id
       WHERE ps.playlist_id = ?
       ORDER BY ps.position IS NULL, ps.position ASC, ps.added_at ASC`,
      [id],
    );

    res.json({
      playlist: playlistRows[0],
      songs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch playlist details" });
  }
});

// add a song into playlist
app.post("/api/playlists/:id/songs", async (req, res) => {
  try {
    const { id } = req.params;
    const { song_id, position } = req.body;

    await db.execute(
      `INSERT INTO Playlist_Song (playlist_id, song_id, position)
       VALUES (?, ?, ?)`,
      [id, song_id, position || null],
    );

    res.status(201).json({ message: "Song added to playlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add song to playlist" });
  }
});

// delete a song from a playlist
app.delete("/api/playlists/:playlistId/songs/:songId", async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    await db.execute(
      `DELETE FROM Playlist_Song
       WHERE playlist_id = ? AND song_id = ?`,
      [playlistId, songId],
    );

    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove song from playlist" });
  }
});

/* ---------------------------
   LIKES
---------------------------- */

// add a song to user's like list
app.post("/api/songs/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    await db.execute(
      `INSERT INTO User_Liked_Song (user_id, song_id)
       VALUES (?, ?)`,
      [user_id, id],
    );

    res.status(201).json({ message: "Song liked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to like song" });
  }
});

// delete a song from user's like list
app.delete("/api/songs/:id/like/:userId", async (req, res) => {
  try {
    const { id, userId } = req.params;

    await db.execute(
      `DELETE FROM User_Liked_Song
       WHERE user_id = ? AND song_id = ?`,
      [userId, id],
    );

    res.json({ message: "Song unliked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to unlike song" });
  }
});

// get all the user liked songs
app.get("/api/users/:userId/liked-songs", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.execute(
      `SELECT song_id
       FROM User_Liked_Song
       WHERE user_id = ?`,
      [userId],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch liked songs" });
  }
});

/* ---------------------------
   START SERVER
---------------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
