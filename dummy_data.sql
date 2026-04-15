USE music_app;

-- =========================
-- USERS
-- password for all sample accounts: password123
-- bcrypt hash for "password123":
-- $2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG
-- =========================

INSERT INTO Users (email, username, password_hash, signup_date) VALUES
('alice@example.com', 'alice', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', '2025-01-10'),
('bob@example.com', 'bob', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', '2025-02-14'),
('charlie@example.com', 'charlie', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', '2025-03-01');

-- =========================
-- ARTISTS
-- password for all sample artist accounts: password123
-- =========================

INSERT INTO Artists (email, password_hash, first_name, last_name, country, debut_year) VALUES
('weeknd@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Abel', 'Tesfaye', 'Canada', 2010),
('daftpunk@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Daft', 'Punk', 'France', 1993),
('ariana@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Ariana', 'Grande', 'USA', 2013),
('kendrick@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Kendrick', 'Lamar', 'USA', 2011),
('sza@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'SZA', 'Artist', 'USA', 2012);

-- =========================
-- ALBUMS
-- =========================

INSERT INTO Albums (album_title, release_year) VALUES
('After Hours', 2020),
('Random Access Memories', 2013),
('Thank U, Next', 2019),
('DAMN.', 2017),
('SOS', 2022),
('Collab Vibes', 2024);

-- =========================
-- SONGS
-- duration stored in seconds
-- =========================

INSERT INTO Songs (song_title, album_id, duration, views) VALUES
('Blinding Lights', 1, 200, 5000000),
('Save Your Tears', 1, 215, 3200000),
('Get Lucky', 2, 248, 4100000),
('Instant Crush', 2, 337, 2100000),
('7 rings', 3, 179, 3900000),
('thank u, next', 3, 207, 4500000),
('HUMBLE.', 4, 177, 6000000),
('LOVE.', 4, 213, 2800000),
('Kill Bill', 5, 153, 3500000),
('Snooze', 5, 201, 2400000),
('Midnight City Lights', 6, 230, 850000),
('Dreamscape', 6, 242, 920000);

-- =========================
-- ARTIST_ALBUM
-- many-to-many
-- =========================

INSERT INTO Artist_Album (artist_id, album_id) VALUES
(1, 1), -- The Weeknd -> After Hours
(2, 2), -- Daft Punk -> Random Access Memories
(3, 3), -- Ariana -> Thank U, Next
(4, 4), -- Kendrick -> DAMN.
(5, 5), -- SZA -> SOS
(1, 6), -- The Weeknd -> Collab Vibes
(3, 6), -- Ariana -> Collab Vibes
(5, 6); -- SZA -> Collab Vibes

-- =========================
-- ARTIST_SONG
-- many-to-many
-- =========================

INSERT INTO Artist_Song (artist_id, song_id) VALUES
(1, 1),  -- Blinding Lights
(1, 2),  -- Save Your Tears
(2, 3),  -- Get Lucky
(2, 4),  -- Instant Crush
(3, 5),  -- 7 rings
(3, 6),  -- thank u, next
(4, 7),  -- HUMBLE.
(4, 8),  -- LOVE.
(5, 9),  -- Kill Bill
(5, 10), -- Snooze
(1, 11), -- Midnight City Lights
(3, 11), -- Midnight City Lights collab
(1, 12), -- Dreamscape
(5, 12); -- Dreamscape collab

-- =========================
-- PLAYLISTS
-- =========================

INSERT INTO Playlists (user_id, playlist_name, created_date) VALUES
(1, 'Late Night Drive', '2025-04-01'),
(1, 'Pop Favorites', '2025-04-05'),
(2, 'Workout Mix', '2025-04-10'),
(3, 'Chill Songs', '2025-04-12');

-- =========================
-- PLAYLIST_SONG
-- =========================

INSERT INTO Playlist_Song (playlist_id, song_id, position, added_at) VALUES
(1, 1, 1, '2025-04-01 20:00:00'),
(1, 3, 2, '2025-04-01 20:02:00'),
(1, 11, 3, '2025-04-01 20:04:00'),

(2, 5, 1, '2025-04-05 18:00:00'),
(2, 6, 2, '2025-04-05 18:03:00'),
(2, 10, 3, '2025-04-05 18:05:00'),

(3, 7, 1, '2025-04-10 07:30:00'),
(3, 8, 2, '2025-04-10 07:33:00'),
(3, 3, 3, '2025-04-10 07:36:00'),

(4, 9, 1, '2025-04-12 21:00:00'),
(4, 10, 2, '2025-04-12 21:03:00'),
(4, 12, 3, '2025-04-12 21:05:00');

-- =========================
-- USER_LIKED_SONG
-- =========================

INSERT INTO User_Liked_Song (user_id, song_id, liked_at) VALUES
(1, 1, '2025-04-02 10:00:00'),
(1, 3, '2025-04-02 10:05:00'),
(1, 9, '2025-04-02 10:10:00'),
(2, 7, '2025-04-11 08:00:00'),
(2, 8, '2025-04-11 08:05:00'),
(3, 10, '2025-04-13 19:00:00'),
(3, 12, '2025-04-13 19:03:00');