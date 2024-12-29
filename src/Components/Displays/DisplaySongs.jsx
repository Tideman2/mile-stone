//gh;

import { useContext, useRef, useState} from "react";
import { MusicContext } from "../contexts/Provider";
import startPlaying from "../../utils/playMusic";
import addToQueue from "../../utils/addToQueue";
import Modal from "../Modal/Modal";

export default function DisplaySongs() {
  const { sharedData, setSharedData } = useContext(MusicContext);
  const { searchedSongs, deviceId } = sharedData;
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [modalContent, setModalContent] = useState();
  let modal = useRef();

  const onBackBtnClick = () => {
    setSharedData((prev) => ({
      ...prev,
      searchedSongs: [],
      display: `hero`,
    }));
  };

  const handlePlay = async (song) => {
    const { trackId } = song;

    if (trackId && deviceId) {
      await startPlaying(trackId, deviceId);
    }

    setSharedData((prev) => ({
      ...prev,
      songToPlay: song,
    }));
  };

  const handleAddToQueue = async (song) => {
    const { trackId } = song;
    if (trackId) {
      // Add your add-to-queue logic here
       await addToQueue(trackId)
       setIsModalOpen(true);
       let content = (
        <div className="flex flex-col items-center p-4">
          <p className="text-xl font-semibold text-green-600 text-center">
            Song successfully added to queue!
          </p>
        </div>
      );
      
       setModalContent(content);
      console.log(`Added ${song.songName} to the queue`);
    }
  };

  return (
    <div className="p-4">
        {isModalOpen && (
        <Modal ref={modal} onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </Modal>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-white text-2xl">Search results</h1>
        <button
          className="my-2 bg-blue-500 text-lg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          onClick={onBackBtnClick}
        >
          Back
        </button>
      </div>
      <div className="bg-white opacity-50 mx-5 px-4 rounded-lg shadow-md">
        <ul className="py-3">
          {searchedSongs.map((song) => (
            <li
              key={song.id}
              className="mt-2 p-4 flex flex-wrap items-center justify-between hover:bg-blue-100 rounded-lg transition duration-200 ease-in-out"
            >
              <div className="flex items-center space-x-4 flex-1">
                <img
                  src={song.artistImage?.url || "https://via.placeholder.com/50"}
                  alt={song.artistName}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="flex flex-col">
                  <p className="font-medium text-gray-700 truncate">
                    {song.artistName}
                  </p>
                  <p className="text-gray-600 truncate">{song.songName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePlay(song)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  Play
                </button>
                <button
                  onClick={() => handleAddToQueue(song)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
                >
                  Add to Queue
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
