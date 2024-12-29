import Button from '@mui/material/Button';
import SkipNextIcon from '@mui/icons-material/SkipNext'; // Correct import
import React, { useContext } from 'react';
import { MusicContext } from "../contexts/Provider";

function NextBtn() {
  let { player } = useContext(MusicContext).sharedData;

  function handleNext() {
    if (player) {
      player.nextTrack().then(() => {
        console.log('Skipped to next track!');
      });
    }
  }

  return (
    <Button
      onClick={handleNext}
      variant="contained"
      color="primary"
      startIcon={<SkipNextIcon />} // Use correct icon here
    >
      Next
    </Button>
  );
}

export default NextBtn;
