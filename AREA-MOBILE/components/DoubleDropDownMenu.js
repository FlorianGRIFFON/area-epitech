import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'; // Importing FontAwesome5 from expo/vector-icons

const DoubleDropdownMenu = ({ data, onSelectionChange }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [serviceMenuVisible, setServiceMenuVisible] = useState(false);
    const [optionMenuVisible, setOptionMenuVisible] = useState(false);

    const openServiceMenu = () => setServiceMenuVisible(true);
    const closeServiceMenu = () => setServiceMenuVisible(false);

    const openOptionMenu = () => setOptionMenuVisible(true);
    const closeOptionMenu = () => setOptionMenuVisible(false);

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setSelectedOption(null); // Reset selected option when service changes
        closeServiceMenu();
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        closeOptionMenu();
    };

    useEffect(() => {
        onSelectionChange(selectedService, selectedOption);
    }, [selectedService, selectedOption, onSelectionChange]);

    return (
        <PaperProvider>
            <View style={styles.container}>

                <View>
                    <Menu
                        visible={serviceMenuVisible}
                        onDismiss={closeServiceMenu}
                        anchor={
                            <View style={styles.selectButton}>
                                <Text onPress={openServiceMenu} style={styles.selectText}>
                                    {selectedService ? selectedService : 'Select a service'}{' '}
                                    <FontAwesome5 name="caret-down" style={styles.arrowIcon} />
                                </Text>
                            </View>
                        }
                    >
                        {Object.keys(data.services).map((service, index) => (
                            <Menu.Item
                                key={index}
                                onPress={() => handleServiceSelect(service)}
                                title={service}
                            />
                        ))}
                    </Menu>

                    {selectedService && (
                        <Menu
                            visible={optionMenuVisible}
                            onDismiss={closeOptionMenu}
                            anchor={
                                <View style={styles.selectButton}>
                                    <Text onPress={openOptionMenu} style={styles.selectText}>
                                        {selectedOption ? selectedOption : 'Select an option'}{' '}
                                        <FontAwesome5 name="caret-down" style={styles.arrowIcon} />
                                    </Text>
                                </View>
                            }
                        >
                            {data.services[selectedService].map((option, index) => (
                                <Menu.Item
                                    key={index}
                                    onPress={() => handleOptionSelect(option)}
                                    title={option}
                                />
                            ))}
                        </Menu>
                    )}
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectButton: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectText: {
        color: 'black',
    },
    arrowIcon: {
        fontSize: 14,
    },
});

export default DoubleDropdownMenu;
