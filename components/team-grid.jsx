
import { View, StyleSheet, Text, Button } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Modal } from 'react-native';
import QRcode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
    grid: {
        flex: 3,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingBottom: 40,
    },
    pop: {
        backgroundColor: '#fff',
        height: '90%',
        marginTop: '2%',
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginLeft: '20%'
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
    },
    confirm: {
        color: "#f00",
        fontSize: 30,
        textAlign: 'center',
        shadowRadius: 3,
        margin: 20
    },
    bold: {
        fontWeight: 'bold'
    }
})

const key = 'robot-data-list';

const TeamGrid = (props) => {

    const [data, setData] = useState([]);
    const [delPopup, setDelPopup] = useState(false);
    const [qrPopup, setQrPopup] = useState(false);
    const [jsonDat, setJsonDat] = useState({});
    const [sent, setSent] = useState([]);
    const [matchIndex, setMatchIndex] = useState(-1);

    const deleteIndex = async (index) => {
        if (index == -1) {
            return;
        }

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

    const QRCodePopup = (index) => {
        setQrPopup(true);
        setMatchIndex(index);

    }

    const deletePopup = (index) => {
        setDelPopup(true);
        setMatchIndex(index);
        //deleteIndex(index);
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
                                QRCodePopup(index);
                            }} style={styles.gridTitle}>Match {data.matchId}</Text>
                            <Button title='Delete' color={'red'} onPress={() => {
                                deletePopup(index);
                            }} />
                        </View>
                    )
                })
            }
            <View style={{ width: '100%' }}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={delPopup}
                    supportedOrientations={['landscape']}
                >
                    <View style={styles.pop}>
                        <Text style={styles.confirm}>are you sure that you really, {"\n"} <Text style={styles.bold}>REALLY</Text> want to delete this?</Text>
                        <Button title="Yes, Delete it now" onPress={ () => { deleteIndex(matchIndex); setMatchIndex(-1); setDelPopup(false); } }/>
                        <Button title="No, Go back" onPress={ () => { setMatchIndex(-1); setDelPopup(false); } }/>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={qrPopup}
                    supportedOrientations={['landscape']}
                >
                    <View style={styles.pop}>
                        <QRcode
                            value={data[matchIndex]}
                            ecl='L'
                            size={250}
                        />
                        <Button title="Close" onPress={ () => { setMatchIndex(-1); setQrPopup(false); } }/>
                    </View>
                </Modal>

                <Button onPress={() => {
                    //
                    setSent([]);
                    data.map((element, index) => {
                        let newElement = JSON.parse(element);
                        console.log(newElement)
                        console.log(newElement.teamId)
                        console.log(newElement.matchId)
                        console.log(newElement.highGoalAuto)
                        console.log(newElement.matchId)
                        console.log(newElement.lowGoalAuto)
                        console.log(newElement.lowGoalOperated)
                        console.log((newElement.rungClimbedTo === undefined) ? newElement.rungClimedTo : newElement.rungClimbedTo)

                        //sent.push({ind: index, mat: (newElement.matchId === null) ? -1 : newElement.matchId, team: (newElement.teamId === null) ? -1 : newElement.teamId});
                        
                        axios.post('https://what-am-i-doing-production.up.railway.app/game/add-game', {
                            teamId: (newElement.teamId === null) ? -1 : newElement.teamId,
                            matchId: (newElement.matchId === null) ? -1 : newElement.matchId,
                            highGoalAuto: newElement.highGoalAuto,
                            lowGoalAuto: newElement.lowGoalAuto,
                            highGoalOperated: newElement.highGoalOperated,
                            lowGoalOperated: newElement.lowGoalOperated,
                            rungClimbedTo: (newElement.rungClimbedTo === undefined) ? newElement.rungClimedTo : newElement.rungClimbedTo,
                            taxi: newElement.taxi,
                            notes: (newElement.notes === null) ? " " : newElement.notes
                        }).then( async (response) => {

                            console.log(response);

                            if (response.status != 200) {
                                return;
                            }
                            
                            let j = data.map((val, ind) => { 
                                let datVal = JSON.parse(val);
                                let responseVal = JSON.parse(response.config.data);

                                if (datVal.matchId === responseVal.matchId && datVal.teamId === responseVal.teamId) { 
                                    if ( datVal.matchId !== null && datVal.teamId !== null ) {
                                        return ind;
                                    }
                                }
                            });

                            deleteIndex(j);

                            //sent.push(j);

                            /*for (let i = 0; i < sent.length; i++) {
                                deleteIndex(sent[i]);
                            }*/

                        }).catch( (error) => { console.log(error) } )
                    })

                }} title='Push to Central Computer' />
            </View>
        </View>
    )
}

export default TeamGrid;