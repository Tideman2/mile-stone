//gh G
import { refreshToken } from "./refreshToken";

 async function addToQueue(songUri) {
    await refreshToken();
    let accessToken = localStorage.getItem('token');
    try {
        let response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${songUri}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Include the access token here
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Handle errors
            let errorDetails = await response.json();
            console.error('Failed to add to queue:', errorDetails);
            throw new Error(`Error ${response.status}: ${errorDetails.error.message}`);
        }

        console.log('Song added to queue successfully!');
    } catch (error) {
        console.error('Error adding to queue:', error);
    }
}

export default addToQueue
