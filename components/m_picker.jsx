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
        color: '#faa',
        marginBottom: '2%',
        marginTop: '2%',
        textAlign: 'center',
        fontSize: 20
    },
    textOn: {
        marginBottom: '2%',
        marginTop: '2%',
        color: '#afa',
        textAlign: 'center',
        fontSize: 20
    }
});

export default function MPicker(props){
    return (
        <View style={styles.master}>
            <View>
                <TouchableOpacity style={styles.on}>
                    <Text style={styles.textOn}>{props.labels[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off}>
                    <Text style={styles.textOff}>{props.labels[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off}>
                    <Text style={styles.textOff}>{props.labels[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off}>
                    <Text style={styles.textOff}>{props.labels[3]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.off}>
                    <Text style={styles.textOff}>{props.labels[4]}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}