
import { View, StyleSheet, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import axios from 'axios'

const styles = StyleSheet.create({
    grid: {
        flex: 3,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingBottom: 40,
    },
    gridItem: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#696969',
        borderRadius: 10,
        height: 80,
        margin: 10,
        flexDirection: 'row'
    },
    gridTitle: {
        color: 'white',
        marginRight: 20,
        fontSize: 30
    }
})

const key = 'robot-data-list';

const TeamGrid = (props) => {

    const [data, setData] = useState([]);

    const deleteIndex = async (index) => {
        let newData = [];
        try {
            await AsyncStorage.getItem(key).then(e => {
                const data = JSON.parse(e)
                console.log(data)
                data.splice(index, 1)
                newData = data
                console.log(data)
            })
        } catch(e) {
            console.log(e)
        }
        try {
            await AsyncStorage.setItem(key, JSON.stringify(newData))
            setData(newData)
            if (newData === null) {
                setData([]);
            }
        } catch(e) {
            console.log(e)
        }
    }

    const fetchData = async () => {
        try {
            const _datat = await AsyncStorage.getItem(key);
            setData((JSON.parse(_datat) === null) ? [] : JSON.parse(_datat));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const getData = async () => {
            await fetchData();
            
        }
        getData();
        axios.get('https://what-am-i-doing-production.up.railway.app/game/get-all').then(e => {
            console.log(data, 'hi')
        })
    }, []);


    return (
        <View style={styles.grid}>
            {
                    data.map((element, index) => {
                    const data = JSON.parse(element);
                    return (
                        <View key={index} style={styles.gridItem}>
                            <Text onPress={() => {
                                props.setCurrentMatchId(data.id);
                            }} style={styles.gridTitle}>Match {data.matchId}</Text>
                            <Button title='Delete' color={'red'} onPress={() => {
                                deleteIndex(index)
                            }} />
                        </View>
                    )
                })
            }
            <View style={{ width: '100%' }}>
                <Button onPress={() => {
                    data.map((element, index) => {
                        let newElement = JSON.parse(element)
                        console.log(newElement)
                        console.log(newElement.teamId)
                        console.log(newElement.matchId)
                        console.log(newElement.highGoalAuto)
                        console.log(newElement.matchId)
                        console.log(newElement.lowGoalAuto)
                        console.log(newElement.lowGoalOperated)
                        console.log(newElement.rungClimbedTo)
                        
                        axios.post('https://what-am-i-doing-production.up.railway.app/game/add-game', {
                            teamId: newElement.teamId,
                            matchId: newElement.matchId,
                            highGoalAuto: newElement.highGoalAuto,
                            lowGoalAuto: newElement.lowGoalAuto,
                            highGoalOperated: newElement.highGoalOperated,
                            lowGoalOperated: newElement.lowGoalOperated,
                            rungClimbedTo: newElement.rungClimedTo,
                            taxi: newElement.taxi,
                            notes: ''
                        }).then(() => {
                            console.log("heyyyy")
                        })
                    })

                }} title='Push to Central Computer' />
            </View>
        </View>
    )
}

export default TeamGrid;