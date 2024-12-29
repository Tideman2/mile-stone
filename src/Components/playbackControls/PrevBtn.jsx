import Button from '@mui/material/Button';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'; // Correct import
import React, { useContext } from 'react';
import { MusicContext } from "../contexts/Provider";

function PrevBtn() {
  let { player } = useContext(MusicContext).sharedData;

  function handlePrev() {
    if (player) {
      player.previousTrack().then(() => {
        console.log('Set to previous track!');
      });
    }
  }

  return (
    <Button
      onClick={handlePrev}
      variant="contained"
      color="primary"
      startIcon={<SkipPreviousIcon />} // Use correct icon here
    >
      Prev
    </Button>
  );
}

export default PrevBtn;
