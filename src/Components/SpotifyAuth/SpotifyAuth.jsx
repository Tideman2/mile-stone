import React, { useEffect } from "react";
import generateCodeVerifier from "../../utils/generateCodeVerifier";
import generateCodeChallenge from "../../utils/generateCodeChallenge";

// Make sure to include quotes around URL strings
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000/callback";
const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = [
  'user-read-private',              // Access user's private data
  'user-read-email',                // Access user's email
  'user-read-playback-state',       // Read playback state
  'user-modify-playback-state',     // Modify playback (start, pause, skip, etc.)
  'user-read-currently-playing',    // Read currently playing track
  'streaming'                       // Required for playback via Web Playback SDK
].join(' ');


// 'offline_access',
//gh
const SpotifyAuth = () => { 

  const handleLogin = async () => {
    if (!clientId) {
        console.error("Client ID is not set");
        return;
      }

      // Generate code verifier and challenge
  const codeVerifier = generateCodeVerifier(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store the code verifier in localStorage for later use
  window.localStorage.setItem('code_verifier', codeVerifier);
 console.log(codeVerifier)

      // Redirect user to Spotify auth
      const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=${encodeURIComponent(scopes)}`;
      window.location.href = authUrl;
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default SpotifyAuth;
