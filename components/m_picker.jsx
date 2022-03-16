import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({});

export default function MPicker(props){
    return (
        <View style={styles.master}>
            <TouchableOpacity>
                <Text>{props.labels[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>{props.labels[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>{props.labels[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>{props.labels[3]}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>{props.labels[4]}</Text>
            </TouchableOpacity>
        </View>
    );
}