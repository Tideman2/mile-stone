 //gh G " "
import styles from "../Displays/display1.module.css";
import { useContext, useEffect, useState } from "react"
import { MusicContext } from '../contexts/Provider';
import Player from "../Player/SpotifyPlayer";

function Layout({children}) {
    let {sharedData } = useContext(MusicContext);
    let { songToPlay } = sharedData;
    let [isNavPlayBackContols, setIsNavPlayBackControls] = useState(false)
      
    useEffect(() => {
        if(songToPlay) {
            console.log(`song In`, songToPlay)
            setIsNavPlayBackControls(true);
        } else {
            console.log(`no song to play`, songToPlay)
            setIsNavPlayBackControls(false);
        }

    }, [songToPlay])
      
    return (
        <div className={styles.card}>
       {isNavPlayBackContols && <Player />}
        {children}
        </div>
       
    )
}

export default Layout