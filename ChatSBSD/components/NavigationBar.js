import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavigationBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
        <Text style={styles.navItem}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Certification')}>
        <Text style={styles.navItem}>Certification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('VSBFA')}>
        <Text style={styles.navItem}>VSBFA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('BusinessDevelopment')}>
        <Text style={styles.navItem}>Business Development</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SourcingCompliance')}>
        <Text style={styles.navItem}>Sourcing & Compliance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#00447c', // Assuming a color from the website
  },
  navItem: {
    color: '#ffffff', // Text color for better readability
  },
});

export default NavigationBar;

