import React from 'react';
import { StyleSheet, View } from 'react-native';
import Form from './Form'

export default function App() {


  return (
    <View style={styles.container}>
      <Form/>      
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
