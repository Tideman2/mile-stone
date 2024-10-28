const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Store this securely
const tokenEndpoint = `https://accounts.spotify.com/api/token`;
//gh

export const refreshToken = async () => {
  let tokenTimeStamp = window.localStorage.getItem(`tokenTimeStamp`);
  let refreshToken = localStorage.getItem('refresh_token');

  let currentTime = Date.now();
  let tokenExpired = tokenTimeStamp? currentTime > parseInt(tokenTimeStamp, 10): true;

  if (tokenExpired) {
     if(!refreshToken) {
      console.log(`no refresh token found`);
      return `No refresh token found`
     }

    try{
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });
    
    
      const data = await response.json();
      if (response.ok) {
        //update access Token and refresh token if there is any 
        window.localStorage.setItem('token', data.access_token);
         if(data.refresh_token) {
          window.localStorage.setItem('refresh_token', data.refresh_token)
         }
        
        //update Token TimeStamp in localSatora
         let timeStamp = Date.now() + (data.expires_in * 1000);
         timeStamp = timeStamp - 300000
         window.localStorage.setItem(`tokenTimeStamp`, timeStamp.toString());
        return data.access_token;
      } else {
        console.error('Failed to refresh token', data);
      }
     }catch(error) {
      let lod = `an error occured wile makin de refres token call, ${error}`
      console.log(lod);
      return lod
     }
  }else {
    return
  }
   
  
};