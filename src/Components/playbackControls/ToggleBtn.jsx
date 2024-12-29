 //gh G " "

 import React, { useContext, useState, useEffect } from 'react';
 import Button from '@mui/material/Button';
 import PlayArrowIcon from '@mui/icons-material/PlayArrow';
 import PauseIcon from '@mui/icons-material/Pause';
 import { MusicContext } from "../contexts/Provider";
 
 const PlayButton = () => {
   const { player, songToPlay } = useContext(MusicContext).sharedData;
   const [isPlaying, setIsPlaying] = useState(false);
 
   useEffect(() => {
      // To help with displaying the right contols and managing the control
     //Usin SongToPlay data here in dependencies because When a song is played it gets added to it
     //We are using it as a dependencie for useEffect to stay in synch with users action
     if (player) {
       player.getCurrentState().then(state => {
         if (!state) {
           console.error('User is not playing music through the Web Playback SDK');
           setIsPlaying(false);
           return;
         }
         setIsPlaying(true);
       }).catch(err => {
         console.error('Error retrieving player state:', err);
       });
     }
   }, [player, songToPlay]);
 
   const handleClick = () => {
     if (isPlaying) {
       player.pause().then(() => {
         setIsPlaying(false);
       }).catch(err => {
         console.error('Error pausing playback:', err);
       });
     } else {
       player.resume().then(() => {
         setIsPlaying(true);
       }).catch(err => {
         console.error('Error resuming playback:', err);
       });
     }
   };
 
   return (
     <Button
       onClick={handleClick}
       variant="contained"
       color="primary"
       startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
       aria-label={isPlaying ? 'Pause' : 'Play'}
     >
       {isPlaying ? 'Pause' : 'Play'}
     </Button>
   );
 };
 
 export default PlayButton;