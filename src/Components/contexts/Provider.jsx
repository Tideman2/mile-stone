import { createContext, useState } from "react";

const defaultContextValue = {
    sharedData: { display: "hero", searchedSong: null },
    setSharedData: () => {}, // Placeholder function
  };

export let MusicContext = createContext();

export default function MyProvider({children}) {
    let [sharedData, setSharedData] = useState({
        display: `hero`,
        searchedSongs: [],
        songToPlay: null
    })

    return (
        <MusicContext.Provider value={{sharedData, setSharedData}}>
            {children}
        </MusicContext.Provider>
    )
}