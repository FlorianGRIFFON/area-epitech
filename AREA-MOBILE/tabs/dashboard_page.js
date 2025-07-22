import React, { useState, useEffect } from 'react';
import { TextInput, Linking, Platform, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const navigateAccount = async () => {
    console.log('MyAccount Pressed');
    navigation.navigate('AccountPage');
  };

  const navigateDashboard = async () => {
    console.log('Dashboard Pressed');
    navigation.navigate('DashboardPage');
  };

  const navigateAddAction = async () => {
    console.log('AddAction Pressed');
    navigation.navigate('AddActionPage');
  };

  const navigateServices = async () => {
    console.log('Services Pressed');
    navigation.navigate('ServicesPage');
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={navigateDashboard}>
          <Image source={require('../assets/png/AREA_logo.png')} style={styles.AREAlogo} />
        </TouchableOpacity>
          <TouchableOpacity style={styles.myAccount} onPress={navigateAccount}>
            <Text style={styles.myAccountText}>My account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <View style={styles.content}>
          <Text style={styles.title}>Automations list</Text>
          <TouchableOpacity style={styles.navigateButton} onPress={navigateAddAction}>
            <Text style={styles.navigateButtonText}>Add action</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButton} onPress={navigateServices}>
            <Text style={styles.navigateButtonText}>Log in to services</Text>
          </TouchableOpacity>
          <Text>Dashboard New WIP</Text>

        </View>
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
    marginBottom: '-30%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  navigateButton: {
    borderWidth: 1,
    borderColor: '#9300FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#9300FF',
    alignItems: 'center',
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DashboardScreen;
