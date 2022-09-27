import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'; 
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import Counter from './components/counter';
import MPicker from './components/m_picker';
import { TextInput } from 'react-native';
import { Modal } from 'react-native';
import QRcode from 'react-native-qrcode-svg';
import AsyncStorage  from '@react-native-async-storage/async-storage';
//yarn add @react-native-async-storage/async-storage
import BouncyCheckbox from "react-native-bouncy-checkbox";
async function changeOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}

let jsonData;

export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [highGoalA, setHighGoalA] = useState(0);
  const [highGoalO, setHighGoalO] = useState(0);
  const [lowGoalA, setLowGoalA] = useState(0);
  const [lowGoalO, setLowGoalO] = useState(0);
  const [notes, setNotes] = useState(null);
  const [team, setTeam] = useState(null);
  const [match, setMatch] = useState(null);
  const [popup, setPopup] = useState(false);
  const [rung, setRung] = useState(0);
  const [taxi, setTaxi] = useState(false);
  const [data, setData] = useState([]);
  const [stateController, setStateController] = useState(0);

  if(!isLoaded) {
    return (
      <AppLoading 
        startAsync={async () => {
          await changeOrientation();
        }}
        onFinish={() => setIsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  const QR = () => {
    let raw = {
      'teamId': parseInt(team),
      'highGoalx': highGoalA,
      'lowGoalAuto': lowGoalA,
      'highGoalOperated': highGoalO,
      'lowGoalOperated': lowGoalO,
      'matchId': parseInt(match),
      'rungClimedTo': rung,
      'taxi': taxi,
      'notes': notes
    } //not sure how well notes is gonna work, might but out and die if you put ", ', or like {}.
    jsonData = JSON.stringify(raw);
    setPopup(!popup);
  }

  let dataList = [];

  const key = "robot-data-list";

  const deleteData = async (index = -1) => {
    let temp = null;
    if (index != -1) {
      try {
        temp = await AsyncStorage.getItem(key);
      } catch (e){
        console.log(e);
        return;
      }

      try {
        dataList = temp == null ? [] : JSON.parse(temp);
        dataList.splice(index, 1);
        setData(dataList);
        await AsyncStorage.setItem(key, JSON.stringify(dataList));
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        setData([]);
        dataList = [];
        await AsyncStorage.removeItem(key);
      } catch (e) {
        console.log(e);
      }
    }
  }

  const pushSaveData = async () => {
    let temp = null;
    //i dont think any of this is going to work. oh well
    try {
      temp = await AsyncStorage.getItem(key);
    } finally {}

    try {
      dataList = temp == null ? [] : JSON.parse(temp);
      let raw = {
        'teamId': parseInt(team),
        'highGoalAuto': highGoalA,
        'lowGoalAuto': lowGoalA,
        'highGoalOperated': highGoalO,
        'lowGoalOperated': lowGoalO,
        'matchId': parseInt(match),
        'rungClimedTo': rung,
        'taxi': taxi,
        'notes': notes
      };
      dataList.push(JSON.stringify(raw));
      setData(dataList);
      await AsyncStorage.setItem(key, JSON.stringify(dataList));
    } catch (e) {
      console.log(e);
    }
  }

  const logTaxi = () => {
    if(taxi){
      return 'true'
    }else{
      return 'false'
    }
  }

  if(stateController == 0){
    return (
      <View style={styles.mainContent}>
        {/* <Text style={styles.title}>Jordan -- Setup</Text> */}
        <View style={styles.nav}>
          <Button title="Setup" onPress={e => setStateController(0)}/>
          <Button title="Auto" onPress={e => setStateController(1)}/>
          <Button title="Teleop" onPress={e => setStateController(2)}/>
          <Button title="Final" onPress={e => setStateController(3)}/>
          <Button title="Data" onPress={e => setStateController(4) }/>
        </View>
        <StatusBar style="auto" />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <Modal
            animationType="slide"
            transparent={true}
            visible={popup}
            supportedOrientations={['landscape']}
          >
            <View style={styles.pop}>
              <QRcode
                value={jsonData}
                ecl='L'
                size={250}
              />
              <Button title="close" onPress={e => setPopup(!popup)}/>
            </View>
          </Modal>
          <View style={styles.scrollContent}>
            <View style={styles.ContainNotes}>
              <View style={styles.ContainNotesAndMore}>
                <TextInput
                  keyboardType='numeric'
                  style={styles.team}
                  onChangeText={setTeam}
                  value={team}
                  placeholderTextColor={"#555"}
                  placeholder="Team Number..."
                />
                <TextInput
                  keyboardType='numeric'
                  style={styles.match}
                  onChangeText={setMatch}
                  value={match}
                  placeholderTextColor={"#555"}
                  placeholder="Match Number..."
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }else if(stateController == 1){
    return (
      <View style={styles.mainContent}>
        {/* <Text style={styles.title}>Jordan -- Auto -- hga:{highGoalA}, lga:{lowGoalA}</Text> */}
        <View style={styles.nav}>
          <Button title="Setup" onPress={e => setStateController(0)}/>
          <Button title="Auto" onPress={e => setStateController(1)}/>
          <Button title="Teleop" onPress={e => setStateController(2)}/>
          <Button title="Final" onPress={e => setStateController(3)}/>
          <Button title="Data" onPress={e => setStateController(4) }/>
        </View>
        <StatusBar style="auto" />
          <View style={styles.scrollContent}>
            <View style={styles.containCounter}>
              <Counter title="High Goal Auto" get={highGoalA} set={setHighGoalA}/>
              <Counter title="Low Goal Auto" get={lowGoalA} set={setLowGoalA}/>
            </View>
            <View style={styles.checkContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#666"
                unfillColor="#FFFFFF"
                text="Taxi"
                isChecked={taxi}
                iconStyle={ styles.check }
                onPress={(isChecked) => { setTaxi(isChecked); }}
              />
            </View>
          </View>
      </View>
    )
  }else if(stateController == 2){
    return (
      <View style={styles.mainContent}>
        {/* <Text style={styles.title}>Jordan -- Teleop -- hgo:{highGoalO}, lgo: {lowGoalO}</Text> */}
        <View style={styles.nav}>
          <Button title="Setup" onPress={e => setStateController(0)}/>
          <Button title="Auto" onPress={e => setStateController(1)}/>
          <Button title="Teleop" onPress={e => setStateController(2)}/>
          <Button title="Final" onPress={e => setStateController(3)}/>
          <Button title="Data" onPress={e => setStateController(4) }/>
        </View>
        <StatusBar style="auto" />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.scrollContent}>
            <View style={styles.containCounter}>
              <Counter title="High Goal Op" get={highGoalO} set={setHighGoalO}/>
              <Counter title="Low Goal Op" get={lowGoalO} set={setLowGoalO}/>
            </View>
            <View style={styles.containPicker}>
              <MPicker get={rung} set={setRung} labels={["none", "low", "mid", "high", "traversal"]}/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
  else if(stateController == 3){
    return (
      <View style={styles.mainContent}>
        {/* <Text style={styles.title}>Jordan -- Setup</Text> */}
        <View style={styles.nav}>
          <Button title="Setup" onPress={e => setStateController(0)}/>
          <Button title="Auto" onPress={e => setStateController(1)}/>
          <Button title="Teleop" onPress={e => setStateController(2)}/>
          <Button title="Final" onPress={e => setStateController(3)}/>
          <Button title="Data" onPress={e => setStateController(4) }/>
        </View>
        <StatusBar style="auto" />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.scrollContent}>
            <View style={styles.ContainNotes}>
              <View style={styles.ContainNotesAndMore}>
                <TextInput
                  multiline
                  style={styles.notes}
                  onChangeText={setNotes}
                  value={notes}
                  placeholderTextColor={"#555"}
                  placeholder="Extra Notes..."
                />
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={popup}
            supportedOrientations={['landscape']}
          >
            <View style={styles.pop}>
              <QRcode
                value={jsonData}
                ecl='L'
                size={250}
              />
              <View>
                <Button title="close" onPress={e => setPopup(!popup)}/>
                <Button title="save" onPress={e => pushSaveData() }/>
                <Button title="delete" onPress={e => deleteData() } />
              </View>
            </View>
          </Modal>
          <Button title="gen QR code" onPress={e => QR(team, highGoalA, lowGoalA, highGoalO, lowGoalO, notes)}/>
        </ScrollView>
      </View>
    )
  }
  else if(stateController == 4){
    return (
      <View style={styles.mainContent}>
        {/* <Text style={styles.title}>Jordan -- Setup</Text> */}
        <View style={styles.nav}>
          <Button title="Setup" onPress={e => setStateController(0)}/>
          <Button title="Auto" onPress={e => setStateController(1)}/>
          <Button title="Teleop" onPress={e => setStateController(2)}/>
          <Button title="Final" onPress={e => setStateController(3)}/>
          <Button title="Data" onPress={e => setStateController(4) }/>
        </View>
        <StatusBar style="auto" />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <Button title="cryArea" onPress={ async (e) => {
            console.log(await AsyncStorage.getItem(key));
          } }/>
          <Text>PAIN</Text>
        </ScrollView>
      </View>
    )
  }
  else if(stateController == 10){//this i just use for storage. 
    return (
    {/* 
      <Picker
        selectedValue={rung}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) => setRung(itemValue)}
      >
        <Picker.Item
          label="none"
          value="none"
        />
        <Picker.Item
          label="low"
          value="low"
        />
        <Picker.Item
          label="mid"
          value="mid"
        />
        <Picker.Item
          label="high"
          value="high"
        />
        <Picker.Item
          label="traversal"
          value="traversal"
        />
      </Picker>
    */}
    )
  }
}



const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#0f172a',
    width: '100%',
    height: '100%',
  },
  nav: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkContainer:{
    flexDirection: 'column',
    marginTop: '2%',
    marginLeft: '5%',
  },
  scrollContent: {
    flex: 1,
    height: '100%',
    flexDirection: 'row'
  },
  lowerContentContainer: {
    marginTop: '2%',
    height: '100%'
  },
  LowerContentFlex: {
    height: '100%',
    flexDirection: 'row'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  check: {
    borderColor: '#666',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  containCounter: {
    width: '45%',
    height: '43%'
  },
  containPicker: {
    marginTop: '5%'
  },
  ContainNotes: {
    marginLeft: '5%',
    width: '100%',
    height: '100%',
  },
  dropdown: {
    height: '50%', 
    width: '100%', 
    padding: 0, 
    backgroundColor: '#30283b',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  ContainNotesAndMore: {
    width: '90%',
    height: '100%',
    flexDirection: 'row'
  },
  notes: {
    color: '#fff',
    marginTop: '10%',
    padding: 10,
    width: '95%',
    height: '20%',
    marginBottom: '5%',
    borderWidth: 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: '#333',
    backgroundColor: '#222',
  },
  team: {
    color: '#fff',
    marginTop: '10%',
    padding: 10,
    width: '40%',
    height: '50%',
    borderWidth: 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: '#222',
    backgroundColor: '#111',
    marginBottom: '0%'
  },
  match: {
    color: '#fff',
    marginTop: '10%',
    marginLeft: '20%',
    padding: 10,
    width: '40%',
    height: '50%',
    borderWidth: 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: '#222',
    backgroundColor: '#111',
    marginBottom: '0%'
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
});
