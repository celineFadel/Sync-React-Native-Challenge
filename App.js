import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigator from './src/navigation/app_nav';

class App extends React.Component { 
  render() {
    return (
      <AppNavigator/> 
    );
  }
}

export default App;
