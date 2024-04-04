import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FooterComponent = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerSection}>
        <Text style={styles.footerHeading}>Contact Us</Text>
        <Text style={styles.footerText}>Phone: (804) 786-6585</Text>
        <Text style={styles.footerText}>Fax: (804)-786-9736</Text>
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerHeading}>Quick Links</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.footerLink}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.footerLink}>Certification</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerHeading}>Legal</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.footerLink}>Terms of Use & Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.footerLink}>FOIA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#00447c', // Assuming background color from the HTML
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerSection: {
    alignItems: 'flex-start',
  },
  footerHeading: {
    color: '#ffffff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#ffffff',
    marginBottom: 5,
  },
  footerLink: {
    color: '#ffffff',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
});

export default FooterComponent;
