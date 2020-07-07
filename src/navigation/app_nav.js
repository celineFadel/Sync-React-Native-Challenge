import React                    from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home                     from '../screens/home';
import Details                  from '../screens/details';
import Header                   from '../library/header';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home}
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
          options={{
            headerTitle: "",
            headerRight: () => (
              <Header />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;