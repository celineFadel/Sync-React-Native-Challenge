import React                          from 'react';
import { NavigationContainer }        from '@react-navigation/native';
import { createStackNavigator }       from '@react-navigation/stack';

import Details                        from '../screens/details';
import Root                           from './home_drawer_nav';

import Header                         from '../library/header';
import HomeHeaderRight                from '../library/home_header_right';
import HomeHeaderLeft                 from '../library/home_header_left';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen 
          name="Home" 
          component={Root}
          options={{
          //   headerTitle: "",
          //   headerRight: () => (
          //     <HomeHeaderRight />
          //   ),
          //   headerLeft: () => (
          //     <HomeHeaderLeft />
          //   )
          headerShown: false
          }}
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