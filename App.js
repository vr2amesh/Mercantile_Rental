import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image
} from 'react-native';

import LoginScreen from './src/pages/Login/LoginScreen';
import Navigator from './Routes';

export default class App extends React.Component {
  render() {
    return (
        <Navigator/>     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ee0290",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})