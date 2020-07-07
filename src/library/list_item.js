import React from 'react';
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class ListItem extends React.Component {
    constructor(){
        super();
    }

    goToDetails = () => {
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.goToDetails}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={this.props.url} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.subtitle}>Latitude: <Text style={styles.innerText}>{this.props.latitude}</Text> </Text>
                    <Text style={styles.subtitle}>Longitude: <Text style={styles.innerText}>{this.props.longitude}</Text> </Text>    
                    <Text style={styles.subtitle}>Visits: <Text style={styles.innerText}>{this.props.visits}</Text> </Text> 
                </View>   
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: '5%',
      borderColor: 'grey',
      borderTopWidth: 1
    },
    imageContainer: {
        width: '25%',
        height: '100%'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '75%',
        height: '100%',
        padding: '5%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        fontStyle: 'italic',
        textTransform: 'uppercase',
        textDecorationStyle: 'solid'
    },
    innerText: {
        fontStyle: 'normal',
        textDecorationLine: 'none'
    }
});  