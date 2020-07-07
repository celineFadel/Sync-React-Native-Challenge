import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AccessibilityButton extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#0059b3',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: 'auto',
        padding: '2%',
        marginBottom: '2%'
    },
    text: {
        color: '#0059b3',
        alignSelf: 'center'
    }
});  