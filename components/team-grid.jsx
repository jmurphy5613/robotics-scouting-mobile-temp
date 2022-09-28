
import { View, StyleSheet, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#696969',
        borderRadius: 10,
        height: 80,
        margin: 10,
    },
    gridTitle: {
        color: 'white',
    }
})

const key = 'robot-data-list';

const TeamGrid = (props) => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await AsyncStorage.getItem(key);
            setData(JSON.parse(data));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const getData = async () => {
            await fetchData();
        }
        getData();
    }, []);


    return (
        <View style={styles.grid}>
            {data.map((element, index) => {
                const data = JSON.parse(element);
                return (
                    <View style={styles.gridItem}>
                        <Text onPress={() => {
                            props.setCurrentMatchId(data.id);
                        }} style={styles.gridTitle}>Match {data.matchId}</Text>
                    </View>
                )
            })}
            <View style={{ width: '100%' }}>
                <Button title='Push to Central Computer' />
            </View>
        </View>
    )
}

export default TeamGrid;