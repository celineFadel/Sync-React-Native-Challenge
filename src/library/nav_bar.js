import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default class Home extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.headerLeft} onPress={() => this.props.navigation.toggleDrawer()}>
                    <Image style={styles.image} source={require('../assets/drawer.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerRight}>
                    <Image style={styles.image} source={require('../assets/logo.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '10%',
        position:'absolute',
        top: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: '5%'
    },
    headerRight: {
        right: 0,
        top: 0,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    headerLeft: {
        left: 0,
        top: 0,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    mapText: {
        fontWeight: 'bold',
        color: '#cccccc',
        textTransform: 'uppercase',
        fontSize: 9,
    },
    mapTextActive: {
        fontWeight: 'bold',
        color: 'red',
        textTransform: 'uppercase',
        fontSize: 9,
    },
    iconContainer: {
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    image: {
        height: 50,
        width: 50,
        paddingLeft: 0
    }
});