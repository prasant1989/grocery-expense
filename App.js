import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ImageBackground } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('./assets/gullu.jpg')}>
      <Text>Welcome to Grocery Expense list!..........</Text>
      <StatusBar style="auto" />
     </ImageBackground>
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
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 2 
  },
});
