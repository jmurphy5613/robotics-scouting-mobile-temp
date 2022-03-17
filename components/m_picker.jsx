import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import MPickerButton from './m_p_button';

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
    rounded: {
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    }
});

export default function MPicker(props){
    const [toggleIndex, setToggleIndex] = useState(0);
    return (
        <View style={styles.master}>
            <View>
                <MPickerButton id={0} label={"none"} set={setToggleIndex} condition={toggleIndex} />
                <MPickerButton id={1} label={"low"} set={setToggleIndex} condition={toggleIndex} />
                <MPickerButton id={2} label={"mid"} set={setToggleIndex} condition={toggleIndex} />
                <MPickerButton id={3} label={"high"} set={setToggleIndex} condition={toggleIndex} />
                <MPickerButton id={4} label={"traversal"} set={setToggleIndex} condition={toggleIndex} />
            </View>
        </View>
    );
}