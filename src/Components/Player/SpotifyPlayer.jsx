import React, { useEffect, useState, useContext } from 'react';
//gh   G ""
 import PlayButton from "../playbackControls/ToggleBtn";
 import NextBtn from '../playbackControls/NextBtn';
 import PrevBtn from '../playbackControls/PrevBtn';
 import styles from "./spotifyPlayer.module.css";
 import { MusicContext } from  "../contexts/Provider"

function Player() {
const { player, songToPlay, reRender } = useContext(MusicContext).sharedData;
let [currentlyPlaying, setCurrentlyPlaying] = useState() 


useEffect(() => {
  //using reRender in dependencie to sync useEffect with nectBtn and prevBtn 
  if (player) {
    player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }

      let current_track = state.track_window.current_track;
      let {artists, name: trackName} = current_track;
      let artistData = artists[0];
      let {name: artistName} = artistData
      setCurrentlyPlaying([trackName, artistName]);
      console.log( trackName, artistName, artists);
    }).catch(err => {
      console.error('Error retrieving player state:', err);
    });
  }
}, [songToPlay, reRender]);

  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.artist}>
      {currentlyPlaying && currentlyPlaying[0] && <p >{currentlyPlaying[0]}</p> }
      <p>By</p>
      {currentlyPlaying && currentlyPlaying[1] && <p >{currentlyPlaying[1]}</p> }
      </div>
    <div className={styles.playerContainer}>
     <PrevBtn />
     <PlayButton />
     <NextBtn />
    </div>
    </div>
    </>
  )
}

export default Player