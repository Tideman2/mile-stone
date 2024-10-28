import { useState, useEffect } from "react";
import { refreshToken } from "../../utils/refreshToken";

// dis function is were we will set de user profile and make de api call
//gh
export default function UserProfile() {
let [user, setUser] = useState(null);
let [Loading,  setLoading] = useState(false);
let [error, setError] = useState();

useEffect(() => {
   setLoading(true)
  async function fetcUser() {
    let userEndPoint = 'https://api.spotify.com/v1/me';
    await refreshToken()
    let token = window.localStorage.getItem(`token`);
    console.log('Retrieved Token:', token)
    let reaccesstoken = window.localStorage.getItem(`refresh_token`);
    console.log('Retrieved refresed Token:', reaccesstoken)
    
   
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
           throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
    } catch (error) {
        // Catch any unexpected errors
        setError(`An error occurred: ${error}`);
    }finally {
      setLoading(false)
    }
  }

  fetcUser()
    
}, [])

if (Loading) return <p className="">Loading...</p>;
if (error) return <p className="text-red-500 bg-black p-2 text-center text-lg">{error}</p>;

// Intentionally causing a runtime error by referencing an undefined variable
//const undefinedVariable = nonexistentFunction(); // This will throw an error

return (
  <>
   <section className="flex flex-wrap justify-between sm:max-w-fit">
  <div className="font-serif md:mr-3 w-fit text-neutral-500 p-2 mt-auto bg-lime-50 mb-2
   rounded-lg shadow-2xl">
    {user ? (  // Check if user is not null
      <>
        <p className="">Welcome to miles {user.display_name}</p>
        {/* Add any other properties you'd like to display */}
      </>
    ) : (
      <p>No user data available.</p>  // Optional: Display a message if user data is not available
    )}
  </div>

  {/* Render the image only if user and images exist */}
  {user && user.images && user.images.length > 1 ? (
    <img className="rounded-lg" src={user.images[1].url} alt="User Image" />
  ) : (
    <p>No image available.</p>  // Optional: Display a fallback message if no image exists
  )}
</section>

  </>
);


}

