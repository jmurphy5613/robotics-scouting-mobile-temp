import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import MPickerButton from './m_p_button';

const styles = StyleSheet.create({
    master: {
        marginLeft: '25%',
        height: '100%',
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
    const passUpward = (num) => {
        setToggleIndex(num);
        switch(num){
            case 0:
                props.set(0);
                break;

            case 1:
                props.set(4);
                break;
            
            case 2:
                props.set(6);
                break;
            
            case 3:
                props.set(10);
                break;

            case 4:
                props.set(15);
                break;
            
            default:
                props.set(0);
                break;
        }
    }
    return (
        <View style={styles.master}>
            <View>
                <MPickerButton id={0} label={"none"} set={passUpward} condition={toggleIndex} />
                <MPickerButton id={1} label={"low"} set={passUpward} condition={toggleIndex} />
                <MPickerButton id={2} label={"mid"} set={passUpward} condition={toggleIndex} />
                <MPickerButton id={3} label={"high"} set={passUpward} condition={toggleIndex} />
                <MPickerButton id={4} label={"traversal"} set={passUpward} condition={toggleIndex} />
            </View>
        </View>
    );
}