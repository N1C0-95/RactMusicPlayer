import React from "react";

const LibrarySong = ({ song,songs,setCurrentSong,audioRef, isPlaying, setSongs}) => {

  const songSelectHandler = () =>{
    setCurrentSong(song);

    if(isPlaying){
      const playPromise = audioRef.current.play();
      if(playPromise !== undefined)  {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
        
    const newSongs = songs.map((data) => {
      if(data.id === song.id){
        return{
          ...data,
          active :true
        }
      }
      else{
        return{
          ...data,
          active:false
        }
      }
    });
    setSongs(newSongs);
  }

  
  
  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
      <img alt="image-song" src={song.cover} />
      <div className="song-description">
      <h3> {song.name}</h3>
      <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
