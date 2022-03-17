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
    const passUpward = (num) => {
        setToggleIndex(num);
        switch(num){
            case 0:
                props.set("none");
                break;

            case 1:
                props.set("low");
                break;
            
            case 2:
                props.set("mid");
                break;
            
            case 3:
                props.set("high");
                break;

            case 4:
                props.set("traversal");
                break;
            
            default:
                props.set(`error ${num}`);
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