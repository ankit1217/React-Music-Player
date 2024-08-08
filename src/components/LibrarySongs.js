import React from "react";
import { playAudio } from "../data";

export default function LibrarySongs({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) {
  const songSelectHandler = () => {
    setCurrentSong(song);
    const newSong = songs.map((sng) => {
      if (sng.id === song.id) {
        return {
          ...sng,
          active: true,
        };
      } else {
        return {
          ...sng,
          active: false,
        };
      }
    });
    setSongs(newSong);

    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
