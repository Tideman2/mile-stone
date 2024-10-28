import { useEffect, useState, useContext } from "react";
import { MusicContext } from "../contexts/Provider";

//utility functions
import Input from "../input/Input";
import fetchMusic from "../../utils/fetcMusic";
//gh

export default function SearchSong() {
  let {setSharedData} = useContext(MusicContext)
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
    let result = getInput(); // Store the result of getInput
    if (result) { // Check if result is not null
      let { queryKey: typeName, value: searchQuery } = result;
      console.log(`Type: ${typeName}, Search Query: ${searchQuery}`);
      // Now we can use typeName and searchQuery for fetching
      try{
        let data = await fetchMusic(searchQuery, typeName);
        console.log(data)
       //organize song data
       let organizedSongData = []
        if(typeName === `track`) {
          for(let i = 0; i < data.tracks.items.length; i++) {
            if (data.tracks && data.tracks.items && data.tracks.items.length > 0) {
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
          } else {
              console.log('No tracks found or track data is missing.');
          }
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
        
        
      }catch(error) {
        console.log(`error occured when fetching music`, error.message)
      }
    } else {
      console.log('No valid query found.'); // Handle the case when no valid query is found
    }
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

  return (
    <div className="p-3 text-center mt-5 border font-serif sm:max-w-fit mx-auto md:text-4xl rounded-lg shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out leading-11">
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


