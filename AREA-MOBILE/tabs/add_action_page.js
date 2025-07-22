import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoubleDropdownMenu from '../components/DoubleDropDownMenu';
import actionsJson from '../assets/json/actions.json';

const AddActionScreen = () => {
  const navigation = useNavigation();

  const navigateAccount = () => {
    console.log('MyAccount Pressed');
    navigation.navigate('AccountPage');
  };

  const navigateDashboard = () => {
    console.log('Dashboard Pressed');
    navigation.navigate('DashboardPage');
  };

  const handleValidate = () => {
    console.log('HandleValidate Pressed');
    navigation.navigate('DashboardPage');
  };

  const handleDelete = () => {
    console.log('HandleDelete Pressed');
    navigation.navigate('DashboardPage');
  };

  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectionChange = (service, option) => {
    setSelectedService(service);
    setSelectedOption(option);
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
        <Text style={styles.title}>Add action</Text>
        <TouchableOpacity style={styles.navigateButton} onPress={navigateDashboard}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
        <View style={styles.actionsContainer}>
          <View style={styles.action}>
            <Text>
              Selected Service: {selectedService}, Selected Option: {selectedOption}
            </Text>
            <DoubleDropdownMenu data={actionsJson} onSelectionChange={handleSelectionChange} />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleValidate} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.validButton}>
              <Text style={styles.buttonText}>Validate</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    marginBottom: 16,
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
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  action: {
    flex: 1
  },
  buttonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  validButton: {
    borderWidth: 1,
    borderColor: '#9300FF',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#9300FF',
    alignItems: 'center',
  },
});

export default AddActionScreen;
