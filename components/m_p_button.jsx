import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    master: {
        marginLeft: '25%',
        marginTop: '5%',
        height: '50%',
        width: '100%'
    },
    on: {
        backgroundColor: '#888',
    },
    off: {
        backgroundColor: '#444'
    },
    textOff: {
        marginBottom: '2%',
        marginTop: '2%',
        color: '#faa',
        textAlign: 'center',
        fontSize: 20
    },
    textOn: {
        marginBottom: '2%',
        marginTop: '2%',
        color: '#afa',
        textAlign: 'center',
        fontSize: 20
    },
});

export default function MPickerButton(props) {
    if(props.condition === props.id){
        return (
            <TouchableOpacity style={styles.on} onPress={e => {props.set(props.id)}}>
                <Text style={styles.textOn}>{props.label}</Text>
            </TouchableOpacity>
        );
    }else{
        return (
            <TouchableOpacity style={styles.off} onPress={e => {props.set(props.id)}}>
                <Text style={styles.textOff}>{props.label}</Text>
            </TouchableOpacity>
        );
    }
}

