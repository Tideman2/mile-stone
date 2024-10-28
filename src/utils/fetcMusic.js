import { refreshToken } from "./refreshToken";

//gh G
// function to help when user is making a query in the search component
 async function fetchMusic(userSearchInput, typeName) {
  await refreshToken()
  let accessToken = localStorage.getItem('token')
   let query = encodeURIComponent(userSearchInput);
    let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${typeName}&offset=0&limit=20`, {
        method: `GET`,
        headers: {
        Authorization: `Bearer ${accessToken}`,
        }
      });
  if(!response.ok) {
    console.log(response)
    throw new Error(`failed to fetch searched query in fetchMusic.js`)
  }
  
  let data = await response.json();
  return data
}

export default fetchMusic