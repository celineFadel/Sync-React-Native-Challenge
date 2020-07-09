import React from 'react';
import 'react-native-gesture-handler';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomIconGrey from '../assets/save_grey.svg';
import CustomIconRed from '../assets/save_red.svg';

export default class ListItem extends React.Component {
    constructor(){
        super();
    }
    
    state = {
        saved: false
    }

    goToDetails = () => {
        this.props.onPress(this.props.id);
    }

    saveItem = () => {
        this.state.saved
        ? this.setState({saved: false})
        : this.setState({saved: true});
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.goToDetails}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={this.props.url} />
                </View>
                <View style={styles.textsContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title} numberOfLines={2}>{this.props.title}</Text> 
                        <Text style={styles.subtitle}><Entypo name="eye" size={15} color="#00a988" /> <Text style={styles.innerText}> {this.props.visits}</Text> Visit/month</Text> 
                    </View>
                    <TouchableOpacity onPress={this.saveItem} style={styles.iconContainer} >
                        {
                            this.state.saved
                            ? <CustomIconRed width={20} height={30} />
                            : <CustomIconGrey width={20} height={30} />
                        }
                        <Text style={this.state.saved ? styles.iconTextRed : styles.iconText}>FAVORITE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} >
                        <FontAwesome name="map-o" size={25} color="#cccccc" />
                        <Text style={styles.mapText}>MAP</Text>
                    </TouchableOpacity>
                </View>
                
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingHorizontal: '5%',
      paddingVertical: '3%'
    },
    imageContainer: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        flexDirection: 'column',
        width: '70%',
        height: '100%',
    },
    textsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '80%',
        justifyContent: 'space-between',
        paddingTop: '2%',
        paddingBottom: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    title: {
        fontWeight: 'bold',
        color: '#066ab4',
        textTransform: 'uppercase',
    },
    subtitle: {
        textTransform: 'lowercase',
        textDecorationStyle: 'solid',
        color: '#cccccc',
        fontSize: 12
    },
    innerText: {
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecorationLine: 'none',
        color: 'grey'
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontWeight: 'bold',
        color: '#cccccc',
        textTransform: 'uppercase',
        fontSize: 9,
    },
    iconTextRed: {
        fontWeight: 'bold',
        color: 'red',
        textTransform: 'uppercase',
        fontSize: 9,
    },
    mapText: {
        fontWeight: 'bold',
        color: '#cccccc',
        textTransform: 'uppercase',
        fontSize: 9,
        paddingTop: '10%'
    }
});  