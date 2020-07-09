import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home                           from '../screens/home';

const Drawer = createDrawerNavigator();

export default function Root() {
    return (
        <Drawer.Navigator 
            overlayColor="transparent" 
            initialRouteName="Home" 
            drawerType={'back'}
            drawerStyle={{ width: '80%', backgroundColor:'rgba(6, 106, 180, 0.7)', color:'white' }}
            drawerContentOptions={{
                activeTintColor: '#066ab4',
                itemStyle: { marginVertical: 30, color: 'white' },
                }}
        >
            <Drawer.Screen 
                name="Home" 
                component={Home} 
            />
        </Drawer.Navigator>
    );
  }
  