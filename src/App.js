import React, { useState, useRef } from "react";
//import Style
import "./style/app.scss";
//components
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
function App() {
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);
  const timeUpdateHandler = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    var newCurrentIndex = 0;
    if (direction === "forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      newCurrentIndex = (currentIndex + 1) % songs.length;
      const newSongs = songs.map((data) => {
        if (data.id === songs[newCurrentIndex].id) {
          return {
            ...data,
            active: true,
          };
        } else {
          return {
            ...data,
            active: false,
          };
        }
      });
      setSongs(newSongs);

      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audioRef.current.play();
          });
        }
      }
      return;
    }
    if (direction === "back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        newCurrentIndex = songs.length - 1;
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        newCurrentIndex = (currentIndex - 1) % songs.length;
      }
      //update setSongs

      const newSongs = songs.map((data) => {
        if (data.id === songs[newCurrentIndex].id) {
          return {
            ...data,
            active: true,
          };
        } else {
          return {
            ...data,
            active: false,
          };
        }
      });
      setSongs(newSongs);
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audioRef.current.play();
          });
        }
      }
    }
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        skipTrackHandler={skipTrackHandler}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
