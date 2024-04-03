import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import ChatComponent from './components/ChatComponent';
import ChatComponent2 from './components/ChatComponent2';
import { env } from 'react-native-dotenv';


const App = () => {

  return (
    <View style={styles.container}>
      <ChatComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: 600,
    marginHorizontal: 'auto'
  }
});
  
export default App;
