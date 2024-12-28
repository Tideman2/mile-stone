// import React, { useEffect } from 'react';

// const SpotifyPlayer = () => {
//   useEffect(() => {
//     // Define the callback function
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const token = 'YOUR_ACCESS_TOKEN'; // Replace with your access token
//       const player = new window.Spotify.Player({
//         name: 'Web Playback SDK',
//         getOAuthToken: cb => { cb(token); },
//         volume: 0.5,
//       });

//       // Connect to the player
//       player.connect();

//       player.on('initialization_error', ({ message }) => { console.error(message); });
//       player.on('authentication_error', ({ message }) => { console.error(message); });
//       player.on('account_error', ({ message }) => { console.error(message); });
//       player.on('playback_error', ({ message }) => { console.error(message); });

//       player.on('player_state_changed', state => {
//         console.log(state);
//       });

//       player.on('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//       });

//       player.on('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//       });
//     };

//     // Load the Spotify Web Playback SDK
//     const script = document.createElement('script');
//     script.src = 'https://sdk.scdn.co/spotify-player.js';
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup function to remove the script when the component unmounts
//     return () => {
//       document.body.removeChild(script);
//       delete window.onSpotifyWebPlaybackSDKReady; // Clean up the callback
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Spotify Player</h1>
//       {/* Add your player UI here */}
//     </div>
//   );
// };

// export default SpotifyPlayer;
