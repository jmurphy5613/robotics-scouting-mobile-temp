import { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    add: {
        backgroundColor: '#0f0',
        width: '25%',
        height: '100%',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contain: {
        flexDirection: 'row'
    },
    countBox: {
        backgroundColor: '#333',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    c: {
        color: '#fff',
    },
    subtract: {
        backgroundColor: '#f00',
        width: '25%',
        height: '100%',
        borderBottomEndRadius: 10,
        borderTopEndRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    master: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        marginTop: '5%'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1%'
    }
});

export default function Counter(props){
    return (
        <View style={styles.master}>
            {/* this is the button container. im sorry that there are like five view tags, the button doesn't support styles :cryscream:*/}
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.contain}>
                <TouchableOpacity style={styles.add} onPress={e => {props.set(props.get+1);} }>
                    <Button color="#000"  title="add" onPress={e => {props.set(props.get+1);} }/>
                </TouchableOpacity>
                <View style={styles.countBox}>
                    <Text style={styles.c}>
                       {props.get}
                    </Text> 
                </View>
                <TouchableOpacity style={styles.subtract} onPress={e => {if(props.get > 0){props.set(props.get-1)}}}>
                    <Button color="#000" title="sub" onPress={e => {if(props.get > 0){props.set(props.get-1)}}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}