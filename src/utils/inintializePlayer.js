import { refreshToken } from "./refreshToken";

 //gh G ""
//  const initPlayer = async () => {
//     let player
//      window.onSpotifyWebPlaybackSDKReady({
//       name: 'Web Playback SDK',
//       getOAuthToken: async (cb) => {
//         try {
//           await refreshToken();  // Ensure refreshToken is done before continuing
//           const updatedToken = localStorage.getItem("token");
//           if (updatedToken) {
//             cb(updatedToken);  // Call the callback with the updated token
//           } else {
//             console.error("Token is missing or invalid.");
//           }
//         } catch (error) {
//           console.error('Error refreshing token:', error);
//         }
//       },
//       volume: 0.5,
//     });
  
//     player.on('initialization_error', (e) => {
//       console.error('Player initialization error', e);
//     });
  
//     player.on('authentication_error', (e) => {
//       console.error('Authentication error', e);
//     });
  
//     player.on('player_state_changed', (state) => {
//       console.log('Player state changed:', state);
//     });
  
//     player.on('ready', ({ device_id }) => {
//       console.log('Player is ready, device_id:', device_id);
//     });
  
//     try {
//       // Initialize the player and connect it
//       await player.connect();
//     } catch (error) {
//       console.error('Error connecting to the player:', error);
//     }
  
//     return { playerInstance: player, device_id: player.device_id };
//   };
  
//   export default initPlayer;
  
  


 async function initPlayer() {
   await refreshToken();

   return new Promise((resolve, reject) => {
     window.onSpotifyWebPlaybackSDKReady = () => {
       const playerInstance = new window.Spotify.Player({
         name: "Your Spotify Player",
         getOAuthToken: (cb) => {
           refreshToken().then(() => {
             const updatedToken = localStorage.getItem("token");
             cb(updatedToken);
           });
         },
         volume: 0.5,
       });
 
       playerInstance.addListener("ready", ({ device_id }) => {
         console.log("Ready with Device ID:", device_id);
         resolve({ playerInstance, device_id });
       });
 
       playerInstance.addListener("initialization_error", ({ message }) =>
         reject(`Initialization Error: ${message}`)
       );
 
       playerInstance.addListener("authentication_error", ({ message }) =>
         reject(`Authentication Error: ${message}`)
       );
 
       playerInstance.addListener("account_error", ({ message }) =>
         reject(`Account Error: ${message}`)
       );
 
       playerInstance.connect();
     };
   });
 }
 
 export default initPlayer;
 