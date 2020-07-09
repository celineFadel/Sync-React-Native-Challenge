import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomIconGrey from '../assets/save_grey.svg';
import { AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';

export default class Home extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconContainer}>
                    <AntDesign name="home" size={25} color="red" />
                    <Text style={styles.mapTextActive}>HOMe</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer}>
                    <AntDesign name="search1" size={25} color="#cccccc" />
                    <Text style={styles.mapText}>search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer}>
                    <EvilIcons name="location" size={30} color="#cccccc" />
                    <Text style={styles.mapText}>nearby</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer}>
                    <CustomIconGrey width={20} height={30} />
                    <Text style={styles.mapText}>Favorites</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesome name="map-o" size={25} color="#cccccc" />
                    <Text style={styles.mapText}>MAP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '8%',
        position:'absolute',
        bottom: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});