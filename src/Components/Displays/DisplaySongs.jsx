import { useContext } from "react"
import { MusicContext } from "../contexts/Provider"

import styles from './display1.module.css'
//gh
export default function DisplaySongs() {
  let {sharedData, setSharedData} = useContext(MusicContext)
  let { searchedSongs } = sharedData
  console.log(searchedSongs)

 function onBackBtnClick() {
    setSharedData((prev) => {
       let newData = {
        ...prev,
        searchedSongs: [],
        display: `hero`
       }
     return newData
    })
 }

    return (
        <>
      <div className={styles.card}>
  <div className="flex justify-around items-center">
    <h1 className="font-bold text-white text-2xl">Search results</h1>
    <button
      className="my-2 bg-blue-500 text-lg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
      onClick={onBackBtnClick}
    >
      Back
    </button>
  </div>
  <div className="bg-white opacity-50 mx-5 px-4">
    <ul className="py-3">
      {searchedSongs.map((song) => {
        return (
          <li key={song.id} className="mt-2 pl-2 flex flex-wrap items-center justify-around hover:bg-blue-100 h-16">
            <button className="font-semibold font-serif my-auto bg-blue-500 text-white p-1
             rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out">{song.songName}</button>
            <p className="font-light my-auto">{song.artistName}</p>
          </li>
        );
      })}
    </ul>
  </div>
</div>

        </>
    )
}