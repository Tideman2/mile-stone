//gh

import Display1 from '../Displays/Display1';
import DisplaySongs from '../Displays/DisplaySongs';
import { useContext, useEffect } from 'react';
import { MusicContext } from '../contexts/Provider';
import initPlayer from '../../utils/inintializePlayer';


export default function Home({}) {
    let {sharedData, setSharedData, updatePlayer } = useContext(MusicContext)
    
    useEffect(() => {
        // Define onSpotifyWebPlaybackSDKReady 
        let inintialize = async () => {
            console.log('Spotify Web Playback SDK loaded.');
            let { playerInstance, device_id } = await initPlayer();
            updatePlayer(playerInstance);
            setSharedData((prev) => ({
                ...prev,
                deviceId: device_id
            }));
        };

        // Load the Spotify SDK dynamically
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        inintialize()

        // Clean up the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
   

 //To handle different views
   switch(sharedData.display) {
    case `hero`:
        return <Display1/>;
    case `displaySongs`:
        return <DisplaySongs/>;
    default: 
       return <p>Pls relaod the page</p>
   }
}