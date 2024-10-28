import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const tokenEndPoint = "https://accounts.spotify.com/api/token";
const redirect_uri = "http://localhost:3000/callback"

//gh
const Callback = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    let codeVerifier = window.localStorage.getItem('code_verifier');
     
    if (code) {
      const fetchToken = async () => {
        if(isFetching) return
        setIsFetching(true)
        try {
          console.log('Code:', code);
          console.log('Redirect URI:', redirect_uri);
          console.log('Code Verifier:', codeVerifier);
          console.log('Client ID:', clientId);

          const authString = `${clientId}:${clientSecret}`; 
          const base64AuthString = btoa(authString);
      
          const response = await fetch(tokenEndPoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${base64AuthString}`
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirect_uri,
              code_verifier: codeVerifier
            })
          });
      
          const data = await response.json();
          if (!response.ok) {
            console.error('Error response:', data);
            throw new Error(`Bad request: ${data.error} - ${data.error_description}`);
          }
      
          // Handle successful response
          window.localStorage.setItem('token', data.access_token);
          window.localStorage.setItem('refresh_token', data.refresh_token);
          
          let timeStamp = Date.now() + (data.expires_in * 1000);
          timeStamp = timeStamp - 300000;
          window.localStorage.setItem('tokenTimeStamp', timeStamp.toString());
      
          navigate('/home'); // Redirect to home
        } catch (error) {
          console.error(`Error occurred when making the authorize code to fetch the token:`, error);
        }finally {
          setIsFetching(false);
        }
      };
      
  
      fetchToken();
      setIsLoading(false)
    }else {
      console.log(`no Code`)
    }
  }, [navigate, isFetching]);
  
  
  return (
    <div>{isLoading && <p>Loading...</p>}</div>
  );
};

export default Callback;