import React from 'react';
import { StyleSheet, Text, TouchableOpacity,View } from 'react-native';

export default class HomeNavElement extends React.Component {
    state= {
        active: false
    }

    componentDidMount = () => {
        this.checkActive();
    }

    checkActive = () => {
        this.props.activeId == this.props.id 
        ? this.setState({active: true}) 
        : this.setState({active: false}); 
    }

    setActive = () => {
        this.props.onPress(this.props.id);
        this.setState({active: true});
        this.checkActive();
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {this.setActive}}>
                <Text style={ this.state.active ? styles.textActive : styles.text}>
                    {this.props.title}
                </Text>
                <View style={ this.state.active ? styles.lineActive : styles.line} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingRight: '4%',
        width: 100
    },
    lineActive: {
        borderBottomColor: 'red',
        borderBottomWidth: 3,
        width: '25%',
    },
    textActive: {
        color: '#066ab4',
        fontSize: 18
    },
    line: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 3,
        width: '25%',
    },
    text: {
        color: '#cccccc',
        fontSize: 18
    }
});
