INSERT INTO Artists (email, password_hash, first_name, last_name, country, debut_year)
VALUES
('taylor@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Taylor', 'Swift', 'USA', 2006),
('drake@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Drake', 'Graham', 'Canada', 2009),
('billie@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Billie', 'Eilish', 'USA', 2015),
('ed@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Ed', 'Sheeran', 'UK', 2011),
('olivia@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Olivia', 'Rodrigo', 'USA', 2021);

INSERT INTO Albums (album_title, release_year)
VALUES
('1989', 2014),
('Take Care', 2011),
('Happier Than Ever', 2021),
('Divide', 2017),
('GUTS', 2023),
('Starline Nights', 2025);

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Blank Space', album_id, 231, 6100000
FROM Albums
WHERE album_title = '1989';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Shake It Off', album_id, 219, 8900000
FROM Albums
WHERE album_title = '1989';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Marvin''s Room', album_id, 340, 2600000
FROM Albums
WHERE album_title = 'Take Care';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Headlines', album_id, 235, 3700000
FROM Albums
WHERE album_title = 'Take Care';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Happier Than Ever', album_id, 298, 4200000
FROM Albums
WHERE album_title = 'Happier Than Ever';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Therefore I Am', album_id, 174, 3100000
FROM Albums
WHERE album_title = 'Happier Than Ever';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Shape of You', album_id, 233, 12000000
FROM Albums
WHERE album_title = 'Divide';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Perfect', album_id, 263, 9600000
FROM Albums
WHERE album_title = 'Divide';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'vampire', album_id, 219, 5200000
FROM Albums
WHERE album_title = 'GUTS';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'bad idea right?', album_id, 186, 2800000
FROM Albums
WHERE album_title = 'GUTS';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'City of Glass', album_id, 244, 640000
FROM Albums
WHERE album_title = 'Starline Nights';

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Northern Glow', album_id, 228, 590000
FROM Albums
WHERE album_title = 'Starline Nights';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'taylor@example.com'
  AND al.album_title = '1989';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'drake@example.com'
  AND al.album_title = 'Take Care';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'billie@example.com'
  AND al.album_title = 'Happier Than Ever';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'ed@example.com'
  AND al.album_title = 'Divide';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'olivia@example.com'
  AND al.album_title = 'GUTS';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'drake@example.com'
  AND al.album_title = 'Starline Nights';

INSERT INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id
FROM Artists ar, Albums al
WHERE ar.email = 'billie@example.com'
  AND al.album_title = 'Starline Nights';

  INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'taylor@example.com'
  AND s.song_title = 'Blank Space';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'taylor@example.com'
  AND s.song_title = 'Shake It Off';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'drake@example.com'
  AND s.song_title = 'Marvin''s Room';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'drake@example.com'
  AND s.song_title = 'Headlines';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'billie@example.com'
  AND s.song_title = 'Happier Than Ever';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'billie@example.com'
  AND s.song_title = 'Therefore I Am';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'ed@example.com'
  AND s.song_title = 'Shape of You';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'ed@example.com'
  AND s.song_title = 'Perfect';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'olivia@example.com'
  AND s.song_title = 'vampire';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'olivia@example.com'
  AND s.song_title = 'bad idea right?';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'drake@example.com'
  AND s.song_title = 'City of Glass';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'billie@example.com'
  AND s.song_title = 'City of Glass';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'drake@example.com'
  AND s.song_title = 'Northern Glow';

INSERT INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id
FROM Artists ar, Songs s
WHERE ar.email = 'billie@example.com'
  AND s.song_title = 'Northern Glow';