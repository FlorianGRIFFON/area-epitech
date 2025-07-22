import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from '../env';

const CheckTokenScreen = () => {
  const navigation = useNavigation();

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage has been cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  // clearAll(); // Clear async storage for debug

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Get the access token from AsyncStorage
        const accessToken = await AsyncStorage.getItem('remember_me_token');

        if (accessToken) {
          const credentials = JSON.parse(accessToken);
          console.log('Credentials:', credentials);

          // Validate the access token with your backend
          const validationUrl = `${env.API_URL}/users/login`;
          const response = await axios.post(validationUrl, { token: accessToken });

          // If the token is valid, navigate to Dashboard
          if (response.data.valid) {
            navigation.navigate('DashboardPage');
          } else {
            navigation.navigate('LoginPage');
            // Token is invalid, handle as needed (e.g., log the user out)
            // You can clear the token from AsyncStorage here if necessary
          }
        } else {
          // No token found in AsyncStorage, navigate to register screen
          navigation.navigate('RegisterPage');
        }
      } catch (error) {
        console.error('Error checking token:', error);
        // Handle the error (e.g., network error, server issue)
      }
    };

    checkTokenValidity();
  }, []);

  // Return any component structure here if needed
  return null;
};

export default CheckTokenScreen;
