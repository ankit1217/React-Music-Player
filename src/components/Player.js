import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../data";

export default function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
  timeUpdateHandler,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) {
  // use to grab an html element just like document.getElementById(ref)
  useEffect(() => {
    const newSong = songs.map((sng) => {
      if (sng.id === currentSong.id) {
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
  });

  const playSongHandler = () => {
    // console.log(audioRef.current); // current grabs the current html element and without current it grabs it as an object so use current
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipSongHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-backward") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    playAudio(isPlaying, audioRef);
  };

  const getTime = (time) => {
    return (
      // changing time to formatted one
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        ></input>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          size="2x"
          className="skip-back"
          onClick={() => skipSongHandler("skip-backward")}
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          size="2x"
          className="play"
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
          onClick={() => skipSongHandler("skip-forward")}
        />
      </div>
    </div>
  );
}
