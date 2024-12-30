import Button from '@mui/material/Button';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'; // Correct import
import React, { useContext } from 'react';
import { MusicContext } from "../contexts/Provider";

function PrevBtn() {
  let { sharedData, updateRender } = useContext(MusicContext);
  let { player } = sharedData;

  function handlePrev() {
    if (player) {
      player.previousTrack().then(() => {
        console.log('Set to previous track!');
        updateRender()
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
