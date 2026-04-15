CREATE DATABASE music_app;
USE music_app;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    signup_date DATE NOT NULL
);

CREATE TABLE Artists (
    artist_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    debut_year INT
);

CREATE TABLE Albums (
    album_id INT PRIMARY KEY AUTO_INCREMENT,
    album_title VARCHAR(255) NOT NULL,
    release_year INT
);

CREATE TABLE Songs (
    song_id INT PRIMARY KEY AUTO_INCREMENT,
    song_title VARCHAR(255) NOT NULL,
    album_id INT,
    duration INT NOT NULL,
    views INT DEFAULT 0,
    FOREIGN KEY (album_id) REFERENCES Albums(album_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Playlists (
    playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    playlist_name VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Artist_Album (
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    PRIMARY KEY (artist_id, album_id),
    FOREIGN KEY (artist_id) REFERENCES Artists(artist_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (album_id) REFERENCES Albums(album_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Artist_Song (
    artist_id INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY (artist_id, song_id),
    FOREIGN KEY (artist_id) REFERENCES Artists(artist_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (song_id) REFERENCES Songs(song_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Playlist_Song (
    playlist_id INT NOT NULL,
    song_id INT NOT NULL,
    position INT,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES Playlists(playlist_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (song_id) REFERENCES Songs(song_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE User_Liked_Song (
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (song_id) REFERENCES Songs(song_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);