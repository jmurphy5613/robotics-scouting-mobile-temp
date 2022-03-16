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
    button0: {
        
    },
    button1: {

    },
    button2: {

    },
    button3: {

    },
    button4: {

    },
});

export default function MPicker(props){
    const [toggleIndex, setToggleIndex] = useState(0);
    return (
        <View style={styles.master}>
            <View>
                <TouchableOpacity style={styles.off} onPress={e => {setToggleIndex(0)}}>
                    <Text style={styles.textOff}>{props.labels[0]}{toggleIndex}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off} onPress={e => {setToggleIndex(1)}}>
                    <Text style={styles.textOff}>{props.labels[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off} onPress={e => {setToggleIndex(2)}}>
                    <Text style={styles.textOff}>{props.labels[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off} onPress={e => {setToggleIndex(3)}}>
                    <Text style={styles.textOff}>{props.labels[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off} onPress={e => {setToggleIndex(4)}}>
                    <Text style={styles.textOff}>{props.labels[4]}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}