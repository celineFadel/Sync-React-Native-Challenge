import React from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, SimpleLineIcons, Feather } from '@expo/vector-icons';

export default class Bar extends React.Component {
    constructor(){
        super();
    }

    prepareNameForSearch = (title) => {
        return title.split(" ").join("+");
    }

    imageSearch = () => {
        let title = this.prepareNameForSearch(this.props.title);
        Linking.openURL(`https://www.google.com/search?q=${title}+images`);
    }

    initMap = () => {
        Platform.OS === 'ios'
        ? Linking.openURL(`http://maps.apple.com/?ll=${this.props.latitude},${this.props.longitude}`)
        : Linking.openURL(`geo:${this.props.latitude},${this.props.longitude}`);
    }

    videoSearch = () => {
        let title = this.prepareNameForSearch(this.props.title);
        Linking.openURL(`https://www.youtube.com/results?search_query=${title}`);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.quarterContainer} onPress={this.imageSearch}>
                    <FontAwesome name="photo" size={24} color="#cccccc" />
                    <Text style={styles.text}>PHOTOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quarterContainer}>
                    <SimpleLineIcons name="globe" size={24} color="#cccccc" />
                    <Text style={styles.text}>360°</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quarterContainer} onPress={this.videoSearch}>
                    <Feather name="youtube" size={24} color="#cccccc" />
                    <Text style={styles.text}>VIDEOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quarterContainer} onPress={this.initMap}>
                    <FontAwesome name="map-o" size={24} color="#cccccc" />
                    <Text style={styles.text}>MAP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        marginTop: '5%'
    },
    quarterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cccccc',
        borderWidth: 1,
        height: '100%'
    },
    text: {
        color: '#cccccc',
        padding: '8%'
    }
});  