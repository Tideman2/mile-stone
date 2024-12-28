import { refreshToken } from "./refreshToken";

async function startPlaying(songUri, deviceId) {
  try {
    // Refresh the token and fetch the updated token from localStorage
    await refreshToken();
    let accessToken = localStorage.getItem("token");

    // Make the API call to start playback
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uris: [songUri], // Include the song URI
      }),
    });

    // Check for errors in the response
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to start playback:", errorData);
      throw new Error(`Playback error: ${response.status} ${response.statusText}`);
    }

    console.log("Playback started successfully!");
  } catch (error) {
    console.error("Error in startPlaying function:", error);
  }
}

export default startPlaying;
