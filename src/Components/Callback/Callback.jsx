import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL hash
    const hash = window.location.hash;
    console.log("Window location hash: ", hash);

    let token = window.localStorage.getItem('token');
    console.log("Token from localStorage: ", token);
    
    const refreshToken = window.localStorage.getItem(`refresh_token`)
    console.log("refresToken from localStorage: ", token);

    if (!token && hash) {
      // Convert the hash to a URLSearchParams object for easier parsing
      const params = new URLSearchParams(hash.replace('#', '?'));
      // Get the access token
      token = params.get('access_token');
      console.log("Extracted access token: ", token);

       refreshToken = params.get(`refresh_token`)
      console.log(`Extracted refreshToken, ${refreshToken}`)
      if(token) {
        window.localStorage.setItem(`token`, token);
        if(refreshToken) {
          window.localStorage.setItem(`refresh_token`, refreshToken)
          console.log(`localStore refreshToken, ${refreshToken}`)
        }else {
          console.log(`no refres token`)
        }

        // Clear the URL hash
        window.location.hash = '';

        // Redirect to the home page
      console.log("Redirecting to home page...");
      window.location.href = `/home`;
      }

    }
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
};

export default Callback;