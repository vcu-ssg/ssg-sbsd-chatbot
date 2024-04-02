import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


function Test () {
  return(
    <Text style={styles.header1}>Hello from my component</Text>
  )

  }

export default function App() {
  return (
    <View style={styles.container}>
      <Test />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header1: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});
