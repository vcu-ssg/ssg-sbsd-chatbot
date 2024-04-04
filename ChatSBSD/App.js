import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import ChatComponent from './components/ChatComponent';
import ChatComponent2 from './components/ChatComponent2';
import NavigationBar from './components/NavigationBar';
import FooterComponent from './components/FooterComponent';

import { env } from 'react-native-dotenv';


const App = () => {

  return (
    <View style={styles.viewport}>
      <View style={styles.container}>
        <NavigationBar />
        <View style={{flex:1}}>
        <ChatComponent />
        </View>
        <FooterComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewport: {
    backgroundColor: '#fafafa',
    width:"100vw",
    height:'100vh'
  },
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    width: 700,
    maxWidth: 700,
    marginHorizontal: 'auto',
    flexDirection: 'column'
  }
});
  
export default App;
