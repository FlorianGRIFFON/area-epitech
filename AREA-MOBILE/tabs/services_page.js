import React, { useState, useEffect } from 'react';
import { TextInput, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from '../env';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
// import * as Google from 'expo-google-app-auth';

const ServicesScreen = () => {
  const navigation = useNavigation();

  // Spotify related
  const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
  const scopes = scopesArr.join(' ');
  const spotifyRedirectUrl = AuthSession.makeRedirectUri({
    scheme: 'AREA-MOBILE', // Replace 'my-scheme' with your app's scheme
    path: 'SpotifyRedirectPage',    // Specify the path to handle the authentication
  });
  const spotifyClientId = env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = env.SPOTIFY_CLIENT_SECRET;

  const DiscordClientId = env.DISCORD_CLIENT_ID;
  const discordRedirectUrl = AuthSession.makeRedirectUri({
    scheme: 'AREA-MOBILE',
    path: 'DiscordRedirectPage',
  });
  // const DiscordRedirectUrl = env.DISCORD_REDIRECT_URL;
  const DiscordScopesArr = ['identify', 'email', 'connections' ];
  const DiscordScopes = DiscordScopesArr.join('');
  // const authorizationEndpoint = 'https://discord.com/oauth2/authorize';
  // const tokenEndpoint = 'https://discord.com/api/oauth2/token';

  useEffect(() => {
    // Check if the user has already logged in
    // Check AsyncStorage for the Spotify token
    checkSpotifyLogin();
    getEmailToken();
    checkDiscordLogin();
  }, []);

  const [email, setEmail] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const getEmailToken = async () => {
    const token = await AsyncStorage.getItem('emailToken');
    if (token) {
      setEmailToken(token);
    }
    return token;
  };

  const saveEmailToken = async (email) => {
    await AsyncStorage.setItem('emailToken', email);
    setEmailToken(email);
  };

  const checkSpotifyLogin = async () => {
    const token = await AsyncStorage.getItem('spotifyToken');
    if (token) {
      setSpotifyLogged(true);
    }
  };

  const checkDiscordLogin = async () => {
    const token = await AsyncStorage.getItem('discordToken');
    if (token) {
      setDiscordLogged(true);
    }
  };

  // const getSpotifyCredentials = async () => {
  //   const apiUrl = `${env.API_URL}/api/spotify-credentials`;
  //   const res = await axios.get(apiUrl)
  //   const spotifyCredentials = res.data
  //   return spotifyCredentials
  // }

  // const spotifyCredentials = getSpotifyCredentials();
  // console.log(spotifyCredentials);

  // Helper function to extract access token from the URL
  const extractAccessToken = (url) => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const match = url.match(accessTokenRegex);
    return match ? match[1] : null;
  };

  const handleSpotifyLogin = async () => {
    if (!spotifyLogged) {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUrl}&scope=${encodeURIComponent(scopes)}&response_type=token`;

      let result = await WebBrowser.openAuthSessionAsync(authUrl, spotifyRedirectUrl);

      if (result.type === 'success' && result.url) {
        // Extract access token from the URL
        const accessToken = extractAccessToken(result.url);

        if (accessToken) {
          await AsyncStorage.setItem('spotifyToken', accessToken);
          setSpotifyLogged(true);
        }
      }
    } else {
      // Perform logout or revoke token logic
      await AsyncStorage.removeItem('spotifyToken');
      setSpotifyLogged(false);
    }
  };

  const handleDiscordLogin = async () => {
    if (!discordLogged) {
      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DiscordClientId}&response_type=code&redirect_uri=${discordRedirectUrl}&scope=identify+email+connections`;

      let result = await WebBrowser.openAuthSessionAsync(authUrl, discordRedirectUrl);

      if (result.type === 'success' && result.url) {
        // Extract access token from the URL
        const accessToken = extractAccessToken(result.url);

        if (accessToken) {
          await AsyncStorage.setItem('discordToken', accessToken);
          setDiscordLogged(true);
        }
      }
    } else {
      // Perform logout or revoke token logic
      await AsyncStorage.removeItem('discordToken');
      setDiscordLogged(false);
    }
    // try {
    //   const result = await authorize(discordConfig);
    //   console.log(result);
    // } catch (error) {
    //   console.error('Discord login error:', error);
    // }
  };

  // const handleGmailLogin = async () => {
  //   try {
  //     const { type, accessToken, user } = await Google.logInAsync({
  //       // Your Gmail OAuth configuration
  //       androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  //       scopes: ['email', 'profile'],
  //     });

  //     if (type === 'success') {
  //       // User logged in successfully
  //       console.log('Logged in:', user);
  //       // Save the accessToken securely (AsyncStorage, etc.)
  //       // Set gmailLogged to true
  //       setGmailLogged(true);
  //       // Save the accessToken securely (AsyncStorage, etc.)
  //       await AsyncStorage.setItem('gmailToken', accessToken);
  //     } else {
  //       // Login failed or was cancelled by the user
  //       console.log('Login failed');
  //       await AsyncStorage.removeItem('gmailToken');
  //       setGmailLogged(false);
  //     }
  //   } catch (error) {
  //     console.error('Error in Gmail login:', error);
  //   }
  // };

  const sendEmailUsingToken = async (email, subject, text) => {
    try {
      const apiUrl = `${env.API_URL}/send-email`;
      const response = await axios.post(
        apiUrl,
        {
          email: email,
          subject: subject,
          text: text,
        }
      );
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const fetchCurrentlyPlayingTrack = async () => {
    if (spotifyLogged) {
      const accessToken = await AsyncStorage.getItem('spotifyToken');

      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.item) {
          // Set the current track in state
          setCurrentTrack(response.data.item.name);

          token = getEmailToken();
          if (token) {
            sendEmailUsingToken(email, 'AREA-WEB Spotify Track', response.data.item.name)
          }
        }
      } catch (error) {
        console.error('Error fetching currently playing track:', error);
      }
    }
  };

  const navigateAccount = async () => {
    console.log('MyAccount Pressed');
    navigation.navigate('AccountPage');
  };

  const navigateDashboard = async () => {
    console.log('Dashboard Pressed');
    navigation.navigate('DashboardPage');
  };

  const spotifyLogo = require('../assets/png/spotify.png');
  const gmailLogo = require('../assets/png/gmail.png');
  const discordLogo = require('../assets/png/discord.png');
  const slackLogo = require('../assets/png/slack.png');
  const facebookLogo = require('../assets/png/facebook2.png');
  const calendarLogo = require('../assets/png/calendar.png');

  const [spotifyLogged, setSpotifyLogged] = useState(false);
  const [gmailLogged, setGmailLogged] = useState(false);
  const [discordLogged, setDiscordLogged] = useState(false);
  const [slackLogged, setSlackLogged] = useState(false);
  const [facebookLogged, setFacebookLogged] = useState(false);
  const [calendarLogged, setCalendarLogged] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <View style={styles.container}>
      {/* Your Android specific content */}
      <View style={styles.header}>
      <TouchableOpacity onPress={navigateDashboard}>
        <Image source={require('../assets/png/AREA_logo.png')} style={styles.AREAlogo} />
      </TouchableOpacity>
        <TouchableOpacity style={styles.myAccount} onPress={navigateAccount}>
          <Text style={styles.myAccountText}>My account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Spotify Service */}
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerLeft}>
            <View style={styles.logoContainer}>
              <Image source={spotifyLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.serviceName}>Spotify</Text>
              <Text style={[styles.serviceState, spotifyLogged ? styles.serviceOn : styles.serviceOff]}>
                {spotifyLogged ? 'Service On' : 'Service Off'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleSpotifyLogin((prev) => !prev)}
            style={[
              styles.buttonContainer,
              spotifyLogged ? styles.buttonContainerLogged : styles.buttonContainerNotLogged,
            ]}
          >
            <Text style={styles.buttonText}>{spotifyLogged ? 'Log Out' : 'Log In'}</Text>
          </TouchableOpacity>
        </View>

        {spotifyLogged && (
          <View>
            <TouchableOpacity
              onPress={fetchCurrentlyPlayingTrack}
              style={[
                styles.buttonContainer,
                styles.getCurrentTrackButton
              ]}
            >
              <Text style={styles.buttonText}>Get current playing track</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Display current track */}
        {currentTrack && (
          <View style={styles.currentTrackContainer}>
            <Text style={styles.currentTrackText}>
              Current Track: {currentTrack}
            </Text>
          </View>
        )}

        {/* Gmail Service */}
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerLeft}>

            <View style={styles.logoContainer}>
              <Image source={gmailLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.serviceName}>Gmail</Text>
              <Text style={[styles.serviceState, gmailLogged ? styles.serviceOn : styles.serviceOff]}>
                {gmailLogged ? 'Service On' : 'Service Off'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setGmailLogged((prev) => !prev)}
            style={[
              styles.buttonContainer
            ]}
          >
            <Text style={styles.buttonText}>{gmailLogged ? 'Log Out' : 'Log In'}</Text>
          </TouchableOpacity>
        </View>

        {/* Discord Service */}
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerLeft}>

            <View style={styles.logoContainer}>
              <Image source={discordLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.serviceName}>Discord</Text>
              <Text style={[styles.serviceState, discordLogged ? styles.serviceOn : styles.serviceOff]}>
                {discordLogged ? 'Service On' : 'Service Off'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleDiscordLogin}
            style={[
              styles.buttonContainer
            ]}
          >
            <Text style={styles.buttonText}>{discordLogged ? 'Log Out' : 'Log In'}</Text>
          </TouchableOpacity>
        </View>

        {/* Slack Service */}
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerLeft}>

            <View style={styles.logoContainer}>
              <Image source={slackLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.serviceName}>Slack</Text>
              <Text style={[styles.serviceState, slackLogged ? styles.serviceOn : styles.serviceOff]}>
                {slackLogged ? 'Service On' : 'Service Off'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setSlackLogged((prev) => !prev)}
            style={[
              styles.buttonContainer
            ]}
          >
            <Text style={styles.buttonText}>{slackLogged ? 'Log Out' : 'Log In'}</Text>
          </TouchableOpacity>
        </View>

        {/* Facebook Service */}
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerLeft}>

            <View style={styles.logoContainer}>
              <Image source={facebookLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.serviceName}>Facebook</Text>
              <Text style={[styles.serviceState, facebookLogged ? styles.serviceOn : styles.serviceOff]}>
                {facebookLogged ? 'Service On' : 'Service Off'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setFacebookLogged((prev) => !prev)}
            style={[
              styles.buttonContainer
            ]}
          >
            <Text style={styles.buttonText}>{facebookLogged ? 'Log Out' : 'Log In'}</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Service */}
        <View style={styles.serviceContainer}>
          <View style={styles.serviceContainerLeft}>

            <View style={styles.logoContainer}>
              <Image source={calendarLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.serviceName}>Calendar</Text>
              <Text style={[styles.serviceState, calendarLogged ? styles.serviceOn : styles.serviceOff]}>
                {calendarLogged ? 'Service On' : 'Service Off'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setCalendarLogged((prev) => !prev)}
            style={[
              styles.buttonContainer
            ]}
          >
            <Text style={styles.buttonText}>{calendarLogged ? 'Log Out' : 'Log In'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  AREAlogo: {
    width: 45,
    height: 45,
    marginLeft: 20,
    marginTop: 35,
  },
  myAccount: {
    backgroundColor: '#9300FF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#9300FF',
    marginLeft: 20,
    marginTop: 35,
  },
  myAccountText: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '125%',
    marginLeft: -25,
  },
  serviceContainer: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    paddingRight: 10
  },
  logo: {
    width: 50,
    height: 50,
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  serviceState: {
    fontSize: 14,
  },
  serviceOn: {
    color: 'green',
  },
  serviceOff: {
    color: 'red',
  },
  buttonContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 8,
    marginLeft: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  getCurrentTrackButton: {
    marginTop: 10,
    backgroundColor: '#F0F0F0',
  },
  currentTrackContainer: {
    marginTop: 20,
  },
  currentTrackText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesScreen;
