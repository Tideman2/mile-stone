import { createContext, useState } from "react";
//gh

const defaultContextValue = {
    sharedData: { display: "hero", searchedSong: null },
    setSharedData: () => {}, // Placeholder function
  };

export let MusicContext = createContext();

export default function MyProvider({children}) {
    let [sharedData, setSharedData] = useState({
        display: `hero`,
        searchedSongs: [],
        songToPlay: null,
        deviceId: null,
        player: null,
    })

   function updatePlayer(value) {
        if(!sharedData.player) {
          setSharedData((prev) => {
            let newState = {
                ...prev,
              player:value
            }

            return newState
          })
             
        }
    }

    return (
        <MusicContext.Provider value={{sharedData, setSharedData, updatePlayer}}>
            {children}
        </MusicContext.Provider>
    )
}