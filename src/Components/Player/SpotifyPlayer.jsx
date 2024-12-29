import React, { useEffect } from 'react';
//  gh G ""
 import PlayButton from "../playbackControls/ToggleBtn";
 import NextBtn from '../playbackControls/NextBtn';
 import PrevBtn from '../playbackControls/PrevBtn';
 import styles from "./spotifyPlayer.module.css";

function Player() {

  return (
    <>
    <div className={styles.playerContainer}>
     <PrevBtn />
     <PlayButton />
     <NextBtn />
    </div>
    </>
  )
}

export default Player