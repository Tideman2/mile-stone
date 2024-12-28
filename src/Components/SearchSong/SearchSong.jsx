import { useEffect, useState, useContext, useRef } from "react";
import { MusicContext } from "../contexts/Provider";

//utility functions
import Modal from "../Modal/Modal";
import DisplayArtist from "../ArtistProf/DisplayArtist";
import Input from "../input/Input";
import fetchMusic from "../../utils/fetcMusic";
//gh

export default function SearchSong() {
  let modal = useRef();
  let {setSharedData} = useContext(MusicContext);
  let [error, setError] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [modalContent, setModalContent] = useState();
  let [query, setQuery] = useState({
    track: {
      queryString: ``,
    },
    artist: {
      queryString: ``,
    },
  });
  
  useEffect(() => {
    // to clear userQuery when component unmounts
    return () => {
      setQuery({
        track: {
          queryString: ``,
        },
        artist: {
          queryString: ``,
        },
      })
    }
  }, [])

  // to compare two strings
  function areWordsEqual(word1, word2) {
     return word1.toLowerCase() === word2.toLowerCase()
  }


  function getInput() {
    for (let queryKey in query) {
      // Check if the query string has content
      if (query[queryKey].queryString.length > 0) {
        console.log(`Key: ${queryKey}, Query String: ${query[queryKey].queryString}`);
        let value = query[queryKey].queryString;
        return { queryKey, value }; // Return the key and its value
      }
    }
    return null; // Return null if no valid query is found
  }
  
  async function fetchQuery() {
    // Fetch logic here
    setIsLoading(true);
    let result = getInput(); // Store the result of getInput
    if (result) { // Check if result is not null
      let { queryKey: typeName, value: searchQuery } = result;
      console.log(`Type: ${typeName}, Search Query: ${searchQuery}`);
      // Now we can use typeName and searchQuery for fetching
      try{
        let data = await fetchMusic(searchQuery, typeName);
        console.log(data)
      
       //To check if it is a track or artist the user wants to search for..
        if(typeName === `track`) {
           //organize song data
          let organizedSongData = []
          // for(let i = 0; i < data.tracks.items.length; i++) {
            if (data.tracks && data.tracks.items && data.tracks.items.length > 0) {
              for(let i = 0; i < data.tracks.items.length; i++) { 
                let artistName = data.tracks.items[i].artists[0].name;
                let artistImage = data.tracks.items[i].album.images[0];
                let songName = data.tracks.items[i].name;
                let trackId = data.tracks.items[i].uri;
                let id = data.tracks.items[i].id
                let organizesSong = {
                  artistName,
                  artistImage,
                  songName,
                  trackId,
                  id
                }
                organizedSongData.push(organizesSong);
                console.log(organizesSong);
              }

              setSharedData((prev) => {
                let newData = {
                  ...prev,
                  searchedSongs: organizedSongData,
                  display: `displaySongs`
                }
                console.log(newData);
                return newData
               })
                }
            
          } else {
              console.log('No tracks found or track data is missing.');
          }
          // }
        

       //if user querys an artist
      // setIsModalOpen(true);
      let organizedArtistData = []
      console.log(`we are ere`, data);
       let { artists } = data;
       let { items } = artists;
       for( let item of items) {
           if(areWordsEqual(searchQuery, item.name)) {  
            console.log(item)
            let { name, images } = item;
            setIsModalOpen(true);
             // so we can reset query
              setQuery({
                track: {
                  queryString: ``,
                },
                artist: {
                  queryString: ``,
                },
              })
            setModalContent(
              <DisplayArtist name={name} image={images[0].url} />
            )
            break
           }
      }
      console.log(organizedArtistData)
        
      }catch(error) {
        console.log(`error occured when fetching music`, error.message)
        setError(error.message)
      }
    } else {
      console.log('No valid query found.'); // Handle the case when no valid query is found
    }
    setIsLoading(false)
  }
  

  function onInputChange(event) {
    let { name, value } = event.target;

    // Update the specific queryString based on the input name
    setQuery((prev) => ({
      ...prev,
      [name]: {
        queryString: value, // Update the queryString for the respective input
      },
    }));
  }

  function checkIfToDisable(name) {
    // Check if the queryString length is greater than 0
    return query[name].queryString.length > 0;
  }

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
  <p className="text-xl font-semibold text-yellow-100 animate-pulse">
    Loading...
  </p>
</div>
    )
  }

  if(error) {
    return (
      <p>
        {error}
      </p>
    )
  }
  return (
    <div className="p-3 text-center mt-5 border font-serif sm:max-w-fit mx-auto md:text-4xl rounded-lg shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out leading-11">
      {isModalOpen && (
        <Modal ref={modal} onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </Modal>
      )}
     <h3 className="md:text-3xl font-semibold text-white">
        What would you <br /> like to listen<br />
        <span>To</span>
      </h3>
      <section>
        <Input
          type={"text"}
          name={"track"}
          onChangeAction={onInputChange}
          placeholder={`Looking for a track?`}
          disabled={checkIfToDisable("artist")} // Disable if the artist input has content
        />
        <Input
          type={"text"}
          name={"artist"}
          onChangeAction={onInputChange}
          placeholder={`What about an artist?`}
          disabled={checkIfToDisable("track")} // Disable if the track input has content
        />
      </section>
      <button
        className="my-2 bg-blue-500 text-lg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out mx-auto"
        onClick={fetchQuery}
      >
        Search
      </button>
    </div>
  );
}


