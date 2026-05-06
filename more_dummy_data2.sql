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

INSERT INTO Artists (email, password_hash, first_name, last_name, country, debut_year)
VALUES
('beyonce@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Beyonce', 'Knowles', 'USA', 2003),
('badbunny@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Bad', 'Bunny', 'Puerto Rico', 2016),
('ladygaga@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Lady', 'Gaga', 'USA', 2008),
('justinbieber@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Justin', 'Bieber', 'Canada', 2009),
('dojacat@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Doja', 'Cat', 'USA', 2014),
('harry@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Harry', 'Styles', 'UK', 2017),
('travisscott@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Travis', 'Scott', 'USA', 2013),
('dualipa2@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Luna', 'Vale', 'USA', 2020),
('lanadelrey@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Lana', 'Del Rey', 'USA', 2012),
('coldplay@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Coldplay', 'Band', 'UK', 2000),
('charlixcx@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Charli', 'XCX', 'UK', 2013),
('metro@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Metro', 'Boomin', 'USA', 2013),
('rosalia@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Rosalia', 'Vila', 'Spain', 2017),
('frankocean@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Frank', 'Ocean', 'USA', 2011),
('tyler@example.com', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5m7jVQ1BM8DT6vKrrO5gYv7FpC18mHG', 'Tyler', 'Okonma', 'USA', 2011);


INSERT INTO Albums (album_title, release_year)
SELECT 'Renaissance', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Renaissance');

INSERT INTO Albums (album_title, release_year)
SELECT 'Un Verano Sin Ti', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Un Verano Sin Ti');

INSERT INTO Albums (album_title, release_year)
SELECT 'Chromatica', 2020 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Chromatica');

INSERT INTO Albums (album_title, release_year)
SELECT 'Justice', 2021 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Justice');

INSERT INTO Albums (album_title, release_year)
SELECT 'Planet Her', 2021 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Planet Her');

INSERT INTO Albums (album_title, release_year)
SELECT 'Harry''s House', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Harry''s House');

INSERT INTO Albums (album_title, release_year)
SELECT 'Astroworld', 2018 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Astroworld');

INSERT INTO Albums (album_title, release_year)
SELECT 'Silver Skyline', 2025 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Silver Skyline');

INSERT INTO Albums (album_title, release_year)
SELECT 'Born To Die', 2012 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Born To Die');

INSERT INTO Albums (album_title, release_year)
SELECT 'A Head Full of Dreams', 2015 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'A Head Full of Dreams');

INSERT INTO Albums (album_title, release_year)
SELECT 'Crash', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Crash');

INSERT INTO Albums (album_title, release_year)
SELECT 'Heroes & Villains', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Heroes & Villains');

INSERT INTO Albums (album_title, release_year)
SELECT 'Motomami', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Motomami');

INSERT INTO Albums (album_title, release_year)
SELECT 'Blonde', 2016 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Blonde');

INSERT INTO Albums (album_title, release_year)
SELECT 'Igor', 2019 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Igor');

INSERT INTO Albums (album_title, release_year)
SELECT 'Renaissance', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Renaissance');

INSERT INTO Albums (album_title, release_year)
SELECT 'Un Verano Sin Ti', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Un Verano Sin Ti');

INSERT INTO Albums (album_title, release_year)
SELECT 'Chromatica', 2020 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Chromatica');

INSERT INTO Albums (album_title, release_year)
SELECT 'Justice', 2021 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Justice');

INSERT INTO Albums (album_title, release_year)
SELECT 'Planet Her', 2021 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Planet Her');

INSERT INTO Albums (album_title, release_year)
SELECT 'Harry''s House', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Harry''s House');

INSERT INTO Albums (album_title, release_year)
SELECT 'Astroworld', 2018 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Astroworld');

INSERT INTO Albums (album_title, release_year)
SELECT 'Silver Skyline', 2025 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Silver Skyline');

INSERT INTO Albums (album_title, release_year)
SELECT 'Born To Die', 2012 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Born To Die');

INSERT INTO Albums (album_title, release_year)
SELECT 'A Head Full of Dreams', 2015 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'A Head Full of Dreams');

INSERT INTO Albums (album_title, release_year)
SELECT 'Crash', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Crash');

INSERT INTO Albums (album_title, release_year)
SELECT 'Heroes & Villains', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Heroes & Villains');

INSERT INTO Albums (album_title, release_year)
SELECT 'Motomami', 2022 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Motomami');

INSERT INTO Albums (album_title, release_year)
SELECT 'Blonde', 2016 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Blonde');

INSERT INTO Albums (album_title, release_year)
SELECT 'Igor', 2019 WHERE NOT EXISTS (SELECT 1 FROM Albums WHERE album_title = 'Igor');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Break My Soul', album_id, 278, 4300000 FROM Albums WHERE album_title = 'Renaissance'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Break My Soul');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Cuff It', album_id, 225, 5100000 FROM Albums WHERE album_title = 'Renaissance'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Cuff It');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Alien Superstar', album_id, 215, 2800000 FROM Albums WHERE album_title = 'Renaissance'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Alien Superstar');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Moscow Mule', album_id, 245, 3900000 FROM Albums WHERE album_title = 'Un Verano Sin Ti'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Moscow Mule');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Titi Me Pregunto', album_id, 244, 8700000 FROM Albums WHERE album_title = 'Un Verano Sin Ti'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Titi Me Pregunto');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Me Porto Bonito', album_id, 178, 7600000 FROM Albums WHERE album_title = 'Un Verano Sin Ti'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Me Porto Bonito');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Rain On Me', album_id, 182, 6200000 FROM Albums WHERE album_title = 'Chromatica'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Rain On Me');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Stupid Love', album_id, 193, 4100000 FROM Albums WHERE album_title = 'Chromatica'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Stupid Love');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT '911', album_id, 172, 2300000 FROM Albums WHERE album_title = 'Chromatica'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = '911');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Peaches', album_id, 198, 8800000 FROM Albums WHERE album_title = 'Justice'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Peaches');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Ghost', album_id, 153, 7300000 FROM Albums WHERE album_title = 'Justice'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Ghost');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Anyone', album_id, 190, 3400000 FROM Albums WHERE album_title = 'Justice'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Anyone');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Woman', album_id, 172, 5600000 FROM Albums WHERE album_title = 'Planet Her'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Woman');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Need To Know', album_id, 210, 6700000 FROM Albums WHERE album_title = 'Planet Her'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Need To Know');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Kiss Me More', album_id, 208, 9100000 FROM Albums WHERE album_title = 'Planet Her'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Kiss Me More');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'As It Was', album_id, 167, 10500000 FROM Albums WHERE album_title = 'Harry''s House'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'As It Was');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Late Night Talking', album_id, 177, 5200000 FROM Albums WHERE album_title = 'Harry''s House'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Late Night Talking');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Music For a Sushi Restaurant', album_id, 194, 3100000 FROM Albums WHERE album_title = 'Harry''s House'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Music For a Sushi Restaurant');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Sicko Mode', album_id, 312, 11200000 FROM Albums WHERE album_title = 'Astroworld'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Sicko Mode');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Stargazing', album_id, 270, 4500000 FROM Albums WHERE album_title = 'Astroworld'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Stargazing');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Yosemite', album_id, 150, 3300000 FROM Albums WHERE album_title = 'Astroworld'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Yosemite');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Crystal Roads', album_id, 221, 610000 FROM Albums WHERE album_title = 'Silver Skyline'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Crystal Roads');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Blue Horizon', album_id, 238, 580000 FROM Albums WHERE album_title = 'Silver Skyline'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Blue Horizon');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Velvet Morning', album_id, 205, 490000 FROM Albums WHERE album_title = 'Silver Skyline'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Velvet Morning');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Video Games', album_id, 282, 4400000 FROM Albums WHERE album_title = 'Born To Die'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Video Games');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Summertime Sadness', album_id, 265, 8300000 FROM Albums WHERE album_title = 'Born To Die'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Summertime Sadness');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Born To Die', album_id, 286, 3700000 FROM Albums WHERE album_title = 'Born To Die'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Born To Die');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Adventure of a Lifetime', album_id, 263, 6900000 FROM Albums WHERE album_title = 'A Head Full of Dreams'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Adventure of a Lifetime');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Hymn for the Weekend', album_id, 258, 7700000 FROM Albums WHERE album_title = 'A Head Full of Dreams'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Hymn for the Weekend');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Everglow', album_id, 282, 2600000 FROM Albums WHERE album_title = 'A Head Full of Dreams'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Everglow');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Good Ones', album_id, 136, 1900000 FROM Albums WHERE album_title = 'Crash'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Good Ones');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Beg For You', album_id, 169, 2100000 FROM Albums WHERE album_title = 'Crash'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Beg For You');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Used To Know Me', album_id, 155, 1700000 FROM Albums WHERE album_title = 'Crash'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Used To Know Me');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Creepin', album_id, 221, 9200000 FROM Albums WHERE album_title = 'Heroes & Villains'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Creepin');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Too Many Nights', album_id, 200, 3900000 FROM Albums WHERE album_title = 'Heroes & Villains'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Too Many Nights');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Superhero', album_id, 182, 5800000 FROM Albums WHERE album_title = 'Heroes & Villains'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Superhero');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Saoko', album_id, 137, 2500000 FROM Albums WHERE album_title = 'Motomami'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Saoko');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Despecha', album_id, 157, 6100000 FROM Albums WHERE album_title = 'Motomami'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Despecha');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Candy', album_id, 193, 2200000 FROM Albums WHERE album_title = 'Motomami'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Candy');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Nikes', album_id, 314, 3100000 FROM Albums WHERE album_title = 'Blonde'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Nikes');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Pink + White', album_id, 184, 6400000 FROM Albums WHERE album_title = 'Blonde'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Pink + White');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Self Control', album_id, 249, 5300000 FROM Albums WHERE album_title = 'Blonde'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Self Control');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'Earfquake', album_id, 190, 6800000 FROM Albums WHERE album_title = 'Igor'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'Earfquake');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'New Magic Wand', album_id, 195, 3700000 FROM Albums WHERE album_title = 'Igor'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'New Magic Wand');

INSERT INTO Songs (song_title, album_id, duration, views)
SELECT 'A Boy Is a Gun', album_id, 210, 2900000 FROM Albums WHERE album_title = 'Igor'
AND NOT EXISTS (SELECT 1 FROM Songs WHERE song_title = 'A Boy Is a Gun');

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'beyonce@example.com' AND al.album_title = 'Renaissance';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'badbunny@example.com' AND al.album_title = 'Un Verano Sin Ti';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'ladygaga@example.com' AND al.album_title = 'Chromatica';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'justinbieber@example.com' AND al.album_title = 'Justice';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'dojacat@example.com' AND al.album_title = 'Planet Her';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'harry@example.com' AND al.album_title = 'Harry''s House';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'travisscott@example.com' AND al.album_title = 'Astroworld';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'dualipa2@example.com' AND al.album_title = 'Silver Skyline';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'lanadelrey@example.com' AND al.album_title = 'Born To Die';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'coldplay@example.com' AND al.album_title = 'A Head Full of Dreams';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'charlixcx@example.com' AND al.album_title = 'Crash';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'metro@example.com' AND al.album_title = 'Heroes & Villains';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'rosalia@example.com' AND al.album_title = 'Motomami';

INSERT  INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'frankocean@example.com' AND al.album_title = 'Blonde';

INSERT   INTO Artist_Album (artist_id, album_id)
SELECT ar.artist_id, al.album_id FROM Artists ar JOIN Albums al
WHERE ar.email = 'tyler@example.com' AND al.album_title = 'Igor';

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'beyonce@example.com' AND s.song_title IN ('Break My Soul', 'Cuff It', 'Alien Superstar');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'badbunny@example.com' AND s.song_title IN ('Moscow Mule', 'Titi Me Pregunto', 'Me Porto Bonito');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'ladygaga@example.com' AND s.song_title IN ('Rain On Me', 'Stupid Love', '911');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'justinbieber@example.com' AND s.song_title IN ('Peaches', 'Ghost', 'Anyone');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'dojacat@example.com' AND s.song_title IN ('Woman', 'Need To Know', 'Kiss Me More');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'harry@example.com' AND s.song_title IN ('As It Was', 'Late Night Talking', 'Music For a Sushi Restaurant');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'travisscott@example.com' AND s.song_title IN ('Sicko Mode', 'Stargazing', 'Yosemite');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'dualipa2@example.com' AND s.song_title IN ('Crystal Roads', 'Blue Horizon', 'Velvet Morning');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'lanadelrey@example.com' AND s.song_title IN ('Video Games', 'Summertime Sadness', 'Born To Die');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'coldplay@example.com' AND s.song_title IN ('Adventure of a Lifetime', 'Hymn for the Weekend', 'Everglow');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'charlixcx@example.com' AND s.song_title IN ('Good Ones', 'Beg For You', 'Used To Know Me');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'metro@example.com' AND s.song_title IN ('Creepin', 'Too Many Nights', 'Superhero');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'rosalia@example.com' AND s.song_title IN ('Saoko', 'Despecha', 'Candy');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'frankocean@example.com' AND s.song_title IN ('Nikes', 'Pink + White', 'Self Control');

INSERT   INTO Artist_Song (artist_id, song_id)
SELECT ar.artist_id, s.song_id FROM Artists ar JOIN Songs s
WHERE ar.email = 'tyler@example.com' AND s.song_title IN ('Earfquake', 'New Magic Wand', 'A Boy Is a Gun');