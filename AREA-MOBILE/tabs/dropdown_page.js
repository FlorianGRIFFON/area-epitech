import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DoubleDropdownMenu from '../components/DoubleDropDownMenu';
import actionsJson from '../assets/json/actions.json';
import axios from 'axios';

const DropDownScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dropdownMenus, setDropdownMenus] = useState({});
  const [menuKey, setMenuKey] = useState(0);

  const handleSelectionChange = (service, option, menuId) => {
    console.log("handleSelectionChange");
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [menuId]: { service, option },
    }));
    console.log('Selected Options:', JSON.stringify(selectedOptions, null, 2));
  };

  const handleAddDropdownMenu = () => {
    console.log("handleAddDropdownMenu");
    const newMenuId = `menu_${menuKey}`;
    const newDropdownMenus = {
      ...dropdownMenus,
      [newMenuId]: (
        <DoubleDropdownMenu
          key={newMenuId}
          data={actionsJson}
          onSelectionChange={(service, option) =>
            handleSelectionChange(service, option, newMenuId)
          }
          onDelete={() => handleDeleteDropdown(newMenuId)}
        />
      ),
    };

    setMenuKey(menuKey + 1);
    setDropdownMenus(newDropdownMenus);
    console.log("dropdownMenus: ", newDropdownMenus);

  };

  const handleDeleteDropdown = (menuId) => {
    console.log("handleDeleteDropdown");
    const updatedDropdownMenus = { ...dropdownMenus };
    delete updatedDropdownMenus[menuId];
    setDropdownMenus(updatedDropdownMenus);

    const updatedSelectedOptions = { ...selectedOptions };
    delete updatedSelectedOptions[menuId];
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleValidate = () => {
    console.log("handleValidate");
    
  }

  return (
    <View style={styles.container}>
      {Object.keys(dropdownMenus).map((menuId) => (
        <View key={menuId} style={styles.dropdownContainer}>
          <TouchableOpacity onPress={() => handleDeleteDropdown(menuId)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
          {dropdownMenus[menuId]}
        </View>
      ))}
      <TouchableOpacity onPress={handleAddDropdownMenu} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleValidate} style={styles.validateButton}>
        <Text style={styles.validateButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  validateButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  validateButtonText: {
    fontSize: 30,
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 10,
    height: 30,
    width: 30,
},
deleteButtonText: {
    color: 'white',
},
});

export default DropDownScreen;
