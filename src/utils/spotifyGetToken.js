let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
let client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

let accessToken = '';
let tokenTimestamp = 0;
let expiresIn = 0;

async function getToken() {
 try {
   if(!accessToken || Date.now() > tokenTimestamp + expiresIn * 1000) {
    let response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    })
     
    if(!response.ok) {
      throw new Error('Failed to fetch access token')
    }
    let data = await response.json();
    accessToken = data.access_token;
    expiresIn = data.expires_in;
    tokenTimestamp = Date.now();
   }else {
    return accessToken
   }
 }
 catch(error) {
   console.log(`error getting token, ${error}`)
   return null 
 }
}

export default getToken