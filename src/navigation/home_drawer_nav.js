import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import { ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Home from '../screens/home';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <ImageBackground style={styles.imageContainer} source={{uri: 'https://img.locationscout.net/images/2018-01/raouche-rock-lebanon_l.jpeg'}}>
            <DrawerContentScrollView style={styles.backgroundView} {...props}>
                <View style = {styles.line} />
                <View style={{height: Dimensions.get("window").height*0.8, paddingVertical: '15%'}}>
                    <DrawerItem icon={() => <Entypo name="dot-single" size={40} color="white" />} label={() => <Text style={styles.drawerText}>Events</Text>} onPress={() => console.log('Link to events')} />
                    <DrawerItem icon={() => <Entypo name="dot-single" size={40} color="white" />} label={() => <Text style={styles.drawerText}>News</Text>} onPress={() => console.log('Link to news')} />
                    <DrawerItem icon={() => <Entypo name="dot-single" size={40} color="white" />} label={() => <Text style={styles.drawerText}>About this app</Text>} onPress={() => console.log('Link to about')} />
                    <DrawerItem icon={() => <Entypo name="dot-single" size={40} color="white" />} label={() => <Text style={styles.drawerText}>Settings</Text>} onPress={() => console.log('Link to settings')} />
                </View>
            </DrawerContentScrollView>
        </ImageBackground>
    );
}

export default function Root() {
    return (
        <Drawer.Navigator 
            overlayColor="transparent" 
            initialRouteName="Home" 
            drawerType={'slide'}
            drawerStyle={{ width: '80%', backgroundColor:'rgba(6, 106, 180, 0.5)', color:'white' }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="Home" 
                component={Home} 
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerText: {
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase',
        paddingVertical: '5%',
    },
    imageContainer: {
        height: '100%',
        width: '100%',
    },
    backgroundView: {
        backgroundColor: 'rgba(6, 106, 180, 0.7)',
    },
    line: {
        height: 900,
        marginVertical: '25%',
        borderLeftWidth: 2,
        borderLeftColor: 'white',
        marginLeft: '11%',
        position: 'absolute',
        paddingVertical: '15%'
    }
})
  