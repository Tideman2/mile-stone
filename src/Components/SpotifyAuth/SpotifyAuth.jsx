import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../../utils/refreshToken";

// Make sure to include quotes around URL strings
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000/callback";
const authEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndPoint = "https://accounts.spotify.com/api/token";
const scopes = [
  'user-read-private',
  'user-read-email'
].join(' ');

// 'offline_access',

const SpotifyAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL contains the access token
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token'); // 'token' as a string key
    

    if (!token && hash) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      token = params.get('access_token'); // 'access_token' as a string
      window.localStorage.setItem('token', token); // 'token' as a string key 
      window.location.hash = ''; // Clear the hash
      navigate('/home'); // Use quotes for string literals
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!clientId) {
        console.error("Client ID is not set");
        return;
      }
      // Redirect user to Spotify auth
      window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scopes)}`;
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
