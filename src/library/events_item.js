import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class EventsItem extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>- {this.props.title}</Text>
                <Text style={styles.dates}>{this.props.date}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: '5%'
    },
    dates: {
        color: '#cccccc'
    },
    title: {
        fontWeight: '500'
    }
});  