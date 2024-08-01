const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Store this securely
const tokenEndpoint = `https://accounts.spotify.com/api/token`;

export const refreshToken = async () => {
  const refreshToken = window.localStorage.getItem('refresh_token');
  if (!refreshToken) {
    console.error('No refresh token available');
    return;
  }
   
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
  if (data.access_token) {
    window.localStorage.setItem('token', data.access_token);
    return data.access_token;
  } else {
    console.error('Failed to refresh token', data);
  }
};