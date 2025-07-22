import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Button, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

  const Colors = {
    white: '#FFFFFF',
    shadow: '#000000',
  };

const AccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateDashboard = async () => {
    console.log('Dashboard Pressed');
    navigation.navigate('DashboardPage');
  };

  const UpdateProfile = async () => {
    console.log('Update Pressed');
    console.log(email);
    console.log(password);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={navigateDashboard}>
          <Image source={require('../assets/png/AREA_logo.png')} style={styles.AREAlogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboard} onPress={navigateDashboard}>
          <Text style={styles.dashboardText}>Dashboard</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainCardView}>
          <Image
            style={styles.UserPic}
            source={require('../assets/png/profilepicdefault.png')}
          />
          <View style={styles.EmailContainer}>
            <Text style={styles.EmailText}>Email</Text>
            <TextInput
              style={styles.EmailInput}
              placeholder="Email"
              onChangeText={(newText) => setEmail(newText)}
              defaultValue={email}
            />
          </View>
          <View style={styles.PasswordContainer}>
            <Text style={styles.PasswordText}>Password</Text>
            <TextInput
              style={styles.PasswordInput}
              placeholder="Password"
              onChangeText={(newText) => setPassword(newText)}
              defaultValue={password}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.validateButton}
            onPress={UpdateProfile}
          >
            <Text style={styles.validateButtonText}>Save changes</Text>
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
    paddingBottom: 20,
    backgroundColor: 'white',
    zIndex: 1,
  },
  AREAlogo: {
    width: 45,
    height: 45,
    marginLeft: 20,
    marginTop: 35,
  },
  dashboard: {
    backgroundColor: '#9300FF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#9300FF',
    marginLeft: 20,
    marginTop: 35,
  },
  dashboardText: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '125%',
    marginLeft: -25,
    marginBottom: '-30%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCardView: {
    height: '60%',
    width: '80%',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
    marginTop: 20,
  },
  UserPic: {
    width: '40%',
    height: '21.6%',
    alignSelf: 'center',
  },
  EmailContainer: {
    marginTop: 20,
  },
  EmailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  EmailInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
  },
  PasswordContainer: {
    marginTop: 20,
  },
  PasswordText: {
    fontSize: 16,
    marginBottom: 8,
  },
  PasswordInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
  },
  validateButton: {
    backgroundColor: '#9300FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 35,
    alignSelf: 'center',
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default AccountScreen;
