import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

export default class HomeHeader extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image PlaceholderContent={<ActivityIndicator />} style={styles.image} source={require('../assets/logo.png')} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '25%'
    },
    image: {
        height: 50,
        width: 50
    }
});
