import React from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class HomeHeader extends React.Component {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.toggleDrawer()}>
                <Image PlaceholderContent={<ActivityIndicator />} style={styles.image} source={require('../assets/drawer.png')} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: '5%'
    },
    image: {
        height: 50,
        width: 50,
    }
});
