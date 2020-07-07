import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Title extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.text}>{this.props.content}</Text>
                <View style={styles.line} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'black',
        fontSize: 20,
        paddingBottom: '2%'
    },
    line: {
        borderBottomColor: 'red',
        borderBottomWidth: 5,
        width: '10%'
    },
    mainContainer: {
        padding: '5%'
    }
});  