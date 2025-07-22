import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Image, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import env from '../env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckboxComponent from '../components/CheckBoxComponent';
import * as Google from 'expo-google-app-auth';

const RegisterScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleRememberMe = () => {
    setRememberMe(prevValue => !prevValue);
  };

  const handleRegister = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);

    try {
      const apiUrl = `${env.API_URL}/users/register`;
      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
        rememberMe: rememberMe,
      });

      console.log('Response:', response.data);

      if (response.data && response.data.token) {
        if (rememberMe) {
          const tokenAsString = JSON.stringify(response.data.token); // Stringify the token object
          const existingToken = await AsyncStorage.getItem('remember_me_token');
          if (existingToken) {
            // If the token exists, update it
            await AsyncStorage.mergeItem('remember_me_token', tokenAsString);
            console.log('Remember me token updated in AsyncStorage');
          } else {
            // If the token doesn't exist, create it
            await AsyncStorage.setItem('remember_me_token', tokenAsString);
            console.log('Remember me token created in AsyncStorage');
          }
        }

        navigation.navigate('DashboardPage');
      } else {
        console.error('Invalid response from the server:', response.data);
        // Handle invalid response here
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        // Handle server error, show appropriate message to the user
        if (error.response && error.response.data && error.response.data.errors) {
          setValidationErrors(error.response.data.errors);
        }
      } else if (error.request) {
        console.error('No Response:', error.request);
        // Handle network error or no response scenario
      } else {
        console.error('Error:', error.message);
        // Handle other errors
      }
    }
  };


  const handleGoogleRegister = async () => {
    console.log('Google Sign-In');
    try {
      let result;
      if (Platform.OS === 'ios') {
        result = await Google.logInAsync({
          iosClientId: env.GOOGLE_WEB_CLIENT_ID_I,
          scopes: ['profile', 'email'],
        });
      } else if (Platform.OS === 'android') {
        result = await Google.logInAsync({
          androidClientId: env.GOOGLE_WEB_CLIENT_ID_A,
          scopes: ['profile', 'email'],
        });
      }

      if (result.type === 'success') {
        // utiliser `result.accessToken` pour faire des requêtes a l'api google
        console.log(result.accessToken);
        return result.accessToken;
      } else {
        console.error(e);
        return { cancelled: true };
      }
    } catch (e) {
      console.error(e);
      return { error: true };
    }
    
    // try {
    // // Initialize Google Sign-In
    // GoogleSignin.configure({
    //   webClientId: env.GOOGLE_WEB_CLIENT_ID,
    //   offlineAccess: false,
    // });

    //   // Trigger Google Sign-In flow
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();

    //   // Get user details from userInfo
    //   const { email: googleEmail, idToken: googleIdToken } = userInfo.user;

    //   // Perform registration using the obtained Google credentials
    //   const apiUrl = `${env.API_URL}/users/register`;
    //   const response = await axios.post(apiUrl, {
    //     email: googleEmail,
    //     gmail_oauth: googleIdToken,
    //     rememberMe: true
    //   });

    //   console.log('Registration response:', response.data);

    //   if (response.data && response.data.token) {
    //     if (rememberMe) {
    //       const tokenAsString = JSON.stringify(response.data.token); // Stringify the token object
    //       const existingToken = await AsyncStorage.getItem('remember_me_token');
    //       if (existingToken) {
    //         // If the token exists, update it
    //         await AsyncStorage.mergeItem('remember_me_token', tokenAsString);
    //         console.log('Remember me token updated in AsyncStorage');
    //       } else {
    //         // If the token doesn't exist, create it
    //         await AsyncStorage.setItem('remember_me_token', tokenAsString);
    //         console.log('Remember me token created in AsyncStorage');
    //       }
    //     }

    //     navigation.navigate('DashboardPage');
    //   } else {
    //     console.error('Invalid response from the server:', response.data);
    //     // Handle invalid response here
    //   }

    //   // Handle response and navigation logic...
    // } catch (error) {
    //   console.error('Google Sign-In Error:', error);
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // Handle sign-in cancellation by user
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // Handle ongoing sign-in process
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // Handle Play Services not available
    //   } else {
    //     // Handle other errors
    //   }
    // }
  };

  const handleFacebookRegister = async () => {
    console.log('Facebook Sign-In');
  };

  const handleAppleRegister = async () => {
    console.log('Apple Sign-In');
  };

  const navigateSignIn = async () => {
    console.log('Sign-in Pressed');
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require('../assets/png/AREA_logo.png')} style={styles.AREAlogo} />
        <TouchableOpacity style={styles.signInButton} onPress={navigateSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}> Register an account </Text>

          <TouchableOpacity style={styles.BrandsButton} onPress={handleGoogleRegister}>
            <Image source={require('../assets/png/Google.png')} style={styles.BrandsLogo} />
            <Text style={styles.BrandsButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.BrandsButton} onPress={handleFacebookRegister}>
            <Image source={require('../assets/png/Facebook.png')} style={styles.BrandsLogo} />
            <Text style={styles.BrandsButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.BrandsButton} onPress={handleAppleRegister}>
            <Image source={require('../assets/png/Apple.png')} style={styles.BrandsLogo} />
            <Text style={styles.BrandsButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}> or </Text>
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.Email_text}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <View style={styles.labelContainer}>
            <Text style={styles.Email_text}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.rememberMeContainer}>
            <CheckboxComponent
              label="Remember me"
              isChecked={rememberMe}
              onChange={handleRememberMe}
            />
          </View>

          <View style={styles.errorContainer}>
            {Object.keys(validationErrors).map((key) => (
              <Text key={key} style={styles.errorText}>
                {validationErrors[key].message}
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.Loginbutton} onPress={handleRegister}>
            <Text style={styles.LoginButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.containerTextAccount}>
            <Text style={styles.AccountYet}>Do you already have an AREA account ?</Text>
            <TouchableOpacity onPress={navigateSignIn}>
              <Text style={styles.SignUpYet}>Sign in</Text>
            </TouchableOpacity>
          </View>
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
  signInButton: {
    backgroundColor: '#9300FF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#9300FF',
    marginLeft: 20,
    marginTop: 35,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '125%',
    marginLeft: -25,
    // paddingTop: '10%',
    // marginBottom: '15%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  BrandsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: '4%',
    width: '100%',
    paddingHorizontal: 70,
    marginBottom: '3%',
  },
  BrandsLogo: {
    marginRight: 20,
  },
  BrandsButtonText: {
    color: 'black',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: '5%',
    marginBottom: '5%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  separatorText: {
    marginHorizontal: 8,
    color: 'black',
  },
  labelContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  Email_text: {
    marginLeft: 4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberMeText: {
    marginLeft: 8,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 12,
  },
  Loginbutton: {
    backgroundColor: '#F3F1F1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  },
  LoginButtonText: {
    color: 'black',
    fontSize: 16,
  },
  containerTextAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  AccountYet: {
    marginRight: 8,
    marginLeft: '5%',
  },
  SignUpYet: {
    flex: 1,
    color: '#9300FF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
