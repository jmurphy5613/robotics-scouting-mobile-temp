
import { View, StyleSheet, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';


const MatchView = (props) => {

    const [matchObject, setMatchObject] = useState({});

    useEffect(() => {
        const getData = async () => {
            await AsyncStorage.getItem('robot-data-list').then((data) => {
                const parsedData = JSON.parse(data);
                const match = parsedData.find((element) => {
                    return element.id === props.currentMatchId;
                });
                setMatchObject(match);
                console.log(match)
            });
        }
        getData();
    }, [])

    return (
        <View>
        </View>
    )
}

export default MatchView;