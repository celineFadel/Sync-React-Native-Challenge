import React from 'react';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';

export default class Header extends React.Component {
    state = {
        phone: '',
        favorite: false
    };

    componentDidMount = async () => {
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('phone');
            
            if (value !== null) {
                this.setState({phone: value});
                value == "Not available"
                ? this.makeAlert()
                : this.makePhoneCall();
            }
        } catch (error) {
            console.log(error);
        }
    };

    tryPhoneCall = async () => {
        await this._retrieveData();
    }

    makeAlert = () => {
        Alert.alert(
            "Error",
            "Phone Number Not Available!",
            [ { text: "OK", onPress: () => console.log("OK Pressed") } ],
            { cancelable: false }
        );
    }

    makePhoneCall = () => {
        let number = this.state.phone;
        Linking.openURL(`tel:${number}`);
    }

    toggleFavorite = () => {
        this.state.favorite
        ? this.setState({ favorite: false})
        : this.setState({ favorite: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconContainer} onPress={this.tryPhoneCall}>
                    <SimpleLineIcons name="screen-smartphone" size={30} color="grey" />
                    <Text style={styles.iconText}>CALL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <SimpleLineIcons name="share-alt" size={30} color="grey" />
                    <Text style={styles.iconText}>SHARE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={this.toggleFavorite}>
                    { !this.state.favorite
                        ?   <View style={ Platform.OS === 'ios' ? styles.doubleIconContainerIOS : styles.doubleIconContainer }>
                                <View style={styles.behind}><Fontisto name="favorite" size={30} color="grey" /></View>
                                <View style={styles.front}><Fontisto name="favorite" size={25} color="white" /></View>
                            </View>
                        :   <View style={ Platform.OS === 'ios' ? styles.doubleIconContainerIOS : styles.doubleIconContainer }>
                                <View style={styles.behind}><Fontisto name="favorite" size={30} color="grey" /></View>
                            </View>
                    }
                    <Text style={styles.iconText}>FAVORITE</Text>
                </TouchableOpacity>
            </View>
        );
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icons: {
        marginRight: 10,
        color: 'white',
        backgroundColor: 'grey'
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    iconText: {
        fontSize: 9,
        color: 'grey'
    },
    behind: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    front: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    doubleIconContainer: {
        justifyContent: 'center',
        width: '100%',
        height: '55%',
    },
    doubleIconContainerIOS: {
        justifyContent: 'center',
        width: '100%',
        height: '72%',
    }
});
