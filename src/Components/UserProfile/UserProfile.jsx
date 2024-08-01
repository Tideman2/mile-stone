import { useState, useEffect } from "react";
import { refreshToken } from "../../utils/refreshToken";
import { data } from "autoprefixer";
import { Await } from "react-router-dom";

// dis function is were we will set de user profile and make de api call
export default function UserProfile() {
let [user, setUser] = useState(null);
let [Loading,  setLoading] = useState(true);
let [error, setError] = useState(null);

useEffect(() => {
  async function fetcUser() {
    let userEndPoint = 'https://api.spotify.com/v1/me';
    let token = window.localStorage.getItem(`token`);
    console.log('Retrieved Token:', token)
     
    if(!token) {
      token = await refreshToken();
      window.localStorage.setItem('accessToken', token);
        console.log('New Token Stored:', token)
    }
    try {
        const response = await fetch(userEndPoint, {
            headers: {
                'Authorization': `Bearer ${token}`  // Properly format the Authorization header
            }
        });
    
        if (response.ok) {
            const data = await response.json();
            setUser(data)
            console.log(data);
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);  // Log detailed error
            setError(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);  // Catch any unexpected errors
        setError(`Error: ${error}`);
    }finally {
      setLoading(false)
    }
  }

  fetcUser()
    
}, [])

if (Loading) return <p className="">Loading...</p>;
if (error) return <p>{error}</p>;



return (
  <>
   <p></p>
     workin
  </>
)

}

