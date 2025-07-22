import axios, { AxiosResponse } from 'axios'
import { handleAutomation } from '../Services/AutomationService'

// Spotify API endpoints
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'

// Function to get recommended tracks
async function getRecommendedTracks(accessToken: string, limit: number = 10): Promise<string[]> {
    try {
        // Example: Obtain seed tracks based on the user's recently played tracks
        const recentlyPlayedResponse: AxiosResponse = await axios.get(
            `${SPOTIFY_API_BASE_URL}/me/player/recently-played`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    limit: 5, // Adjust the limit as needed
                },
            }
        );

        const seedTracks = recentlyPlayedResponse.data.items.map((item: any) => item.track.id);

        // Make the recommendations request with dynamically obtained seed tracks
        const recommendationsResponse: AxiosResponse = await axios.get(
            `${SPOTIFY_API_BASE_URL}/recommendations`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    seed_tracks: seedTracks.join(','),
                    limit: limit,
                },
            }
        );

        const recommendedTracks = recommendationsResponse.data.tracks.map((track: any) => track.uri);

        return recommendedTracks;
    } catch (error) {
        console.error('Error getting recommended tracks:', error.response?.data || error.message);
        throw error;
    }
}

// Function to add tracks to a playlist
async function addTracksToPlaylist(accessToken: string, playlistId, trackUris: string[]): Promise<void> {
    try {
        await axios.post(
            `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
            {
                uris: trackUris,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log('Tracks added to the playlist successfully.');
    } catch (error) {
        console.error('Error adding tracks to playlist:', error.response?.data || error.message);
        throw error;
    }
}

// Get a track id by name and artist name
async function getTrackId(accessToken: string, trackName: string, artistName: string): Promise<string | null> {
    try {
        const response: AxiosResponse = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: `${trackName} ${artistName}`,
                type: 'track',
            },
        });

        const tracks = response.data.tracks.items;

        // Extract the track ID from the search results
        const track = tracks[0]; // You might want to improve this based on your specific use case

        return track ? track.id : null;
    } catch (error) {
        console.error('Error getting track ID:', error.response?.data || error.message);
        throw error;
    }
}

// Get playlist id by name
async function getPlaylistId(accessToken: string, playlistName: string): Promise<string | null> {
    try {
        const response: AxiosResponse = await axios.get(`${SPOTIFY_API_BASE_URL}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const playlists = response.data.items;

        // Find the playlist with the desired name
        const playlist = playlists.find((p: any) => p.name === playlistName);

        return playlist ? playlist.id : null;
    } catch (error) {
        console.error('Error getting playlist ID:', error.response?.data || error.message);
        throw error;
    }
}

// Add track to playlist using ids
async function addTrackToPlaylist(accessToken: string, playlistId: string, trackId: string): Promise<void> {
    try {
        await axios.post(
            `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
            {
                uris: [`spotify:track:${trackId}`],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log('Track added to the playlist successfully.');
    } catch (error) {
        console.error('Error adding track to playlist:', error.response?.data || error.message);
        throw error;
    }
}

// Function to create a playlist
async function createPlaylist(step, accessToken: string): Promise<string> {
    try {
        if (step.details === undefined) {
            console.log('Details is undefined')
            throw new Error('Details is undefined')
        }

        const userResponse: AxiosResponse = await axios.get(`${SPOTIFY_API_BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        const userId: string = userResponse.data.id

        const playlistState = step.details.detail2
        const playStateBool = playlistState === 'true'

        const response: AxiosResponse = await axios.post(
            `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
            {
                name: step.details.detail1,
                public: playStateBool,
                description: step.details.detail3,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        )

        // Extract the new playlist ID from the response
        const playlistId: string = response.data.id

        console.log(`Playlist created successfully with ID: ${playlistId}`)
        return playlistId
    } catch (error) {
        console.error('Error creating playlist:', error.response?.data || error.message)
        throw error
    }
}

// Playing a song
async function checkListening(accessToken: string): Promise<boolean> {
    try {
        const songResponse: AxiosResponse = await axios.get(
            `${SPOTIFY_API_BASE_URL}/me/player/currently-playing`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )

        if (songResponse.data.is_playing) {
            const currentlyPlayingTrack = songResponse.data.item;
            console.log(`Song is playing: ${currentlyPlayingTrack.name} by ${currentlyPlayingTrack.artists.map(artist => artist.name).join(', ')}`); return true
        }
        console.log(`No song playing`);
        return false
    } catch (error) {
        console.error('Error checking if song is playing:', error.response?.data || error.message);
        throw error;
    }
}

// Delete a track from a playlist using track name and artist name
async function deleteTrackFromPlaylist(accessToken: string, playlistId: string, trackName: string, artistName: string): Promise<void> {
    try {
        const trackId = await getTrackId(accessToken, trackName, artistName);

        if (!trackId) {
            console.error(`Track "${trackName}" by "${artistName}" not found.`);
            return;
        }

        await axios.delete(
            `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                data: {
                    tracks: [
                        {
                            uri: `spotify:track:${trackId}`,
                        },
                    ],
                },
            }
        );

        console.log('Track deleted from the playlist successfully.');
    } catch (error) {
        console.error('Error deleting track from playlist:', error.response?.data || error.message);
        throw error;
    }
}

export default async function handleSpotify(automation, accessToken: string) {
    const currentStep = automation.steps[0]
    let isListening: boolean
    isListening = false

    const numberOfSteps = Object.keys(automation.steps).length - 1

    switch (currentStep.action) {
        case 'like':
            console.log('SpotifyLike')

            automation.steps.shift()

            if (numberOfSteps > 0) {
                handleAutomation(automation)
            }
            break
        case 'create_playlist':
            console.log('SpotifyCreatePlaylist')
            try {
                const playlistId = await createPlaylist(currentStep, accessToken)
                console.log(`Playlist ID: ${playlistId}`)
            } catch (error) {
                // Handle errors if needed
                console.error('Error handling Spotify create_playlist:', error.message)
            }

            automation.steps.shift()

            if (numberOfSteps > 0) {
                handleAutomation(automation)
            }
            break
        case 'is_listening':
            console.log('SpotifyIsListening')
            isListening = await checkListening(accessToken)

            if (numberOfSteps > 0) {
                handleAutomation(automation);
            }
            break;
        case 'create_recommended':
            console.log("SpotifyCreateRecommended");
            try {
                const playlistId = await getPlaylistId(accessToken, currentStep.details.detail1);

                const recommendedTracks = await getRecommendedTracks(accessToken);

                console.log(recommendedTracks);

                await addTracksToPlaylist(accessToken, playlistId, recommendedTracks);
            } catch (error) {
            }

            automation.steps.shift();

            if (numberOfSteps > 0) {
                handleAutomation(automation);
                break;
            }
        case 'is_listening':
            console.log("SpotifyIsListening");
            isListening = await checkListening(accessToken)

            if (isListening) {
                console.log("IsListening == true");
                automation.steps.shift()

                if (numberOfSteps > 0) {
                    handleAutomation(automation);
                }
            }
            break;
        case 'add_to_playlist':
            console.log("SpotifyAddToPlaylist")
            try {
                const playlistId = await getPlaylistId(accessToken, currentStep.details.detail1);

                if (!playlistId) {
                    console.error(`Playlist "${currentStep.details.detail1}" not found.`);
                    return;
                }

                const trackId = await getTrackId(accessToken, currentStep.details.detail2, currentStep.details.detail3);

                if (!trackId) {
                    console.error(`Track "${currentStep.details.detail2}" by "${currentStep.details.detail3}" not found.`);
                    return;
                }

                await addTrackToPlaylist(accessToken, playlistId, trackId);
            } catch (error) {
                console.error('Error adding song to playlist:', error.message);
                throw error;
            }

            automation.steps.shift();

            if (numberOfSteps > 0) {
                handleAutomation(automation);
            }
            break;
        case 'delete_song_from_playlist':
            console.log("SpotifyDeleteSongFromPlaylist");
            try {
                const playlistId = await getPlaylistId(accessToken, currentStep.details.detail1);

                if (!playlistId) {
                    console.error(`Playlist "${currentStep.details.detail1}" not found.`);
                    return;
                }

                await deleteTrackFromPlaylist(accessToken, playlistId, currentStep.details.detail3, currentStep.details.detail2);
            } catch (error) {
                console.error('Error deleting song from playlist:', error.message);
                throw error;
            }

            automation.steps.shift();

            if (numberOfSteps > 0) {
                handleAutomation(automation);
            }
            break;
        default:
            console.log("SpotifyDefault");
            break;
    }


}
