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
        reRender: false,
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

    function updateRender() {
        setSharedData((prev) => {
          let newData = {
            ...prev,
            reRender: !prev.reRender,
          }
          return newData
        })
    }

    return (
        <MusicContext.Provider value={{sharedData, setSharedData, updatePlayer, updateRender}}>
            {children}
        </MusicContext.Provider>
    )
}