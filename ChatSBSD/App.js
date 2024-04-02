import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const Test = ()=>{
  return(
    <Text style={styles.header1}>Hello from my component</Text>
  )
}

const Test2 = ()=>{
  return(
    <Text style={styles.header2}>A line underneath</Text>
  )
}


export default function App() {
  return (
    <View style={styles.container}>
      <Test />
      <Text>Open up App.js to start working on your app!</Text>
      <Test2 />
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
  },
  header2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30
  }
});
