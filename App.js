import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'; 
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import Counter from './components/counter';
import { TextInput } from 'react-native';
import { Modal } from 'react-native';
import QRcode from 'react-native-qrcode-svg';

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
  const [popup, setPopup] = useState(false);

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
      'highGoalAuto': highGoalA,
      'lowGoalAuto': lowGoalA,
      'highGoalOperated': highGoalO,
      'lowGoalOperated': lowGoalO,
      'notes': notes
    } //not sure how well notes is gonna work, might but out and die if you put ", ', or like {}.
    jsonData = JSON.stringify(raw);
    setPopup(!popup);
  }

  return (
    <View style={styles.mainContent}>
      
      <Text style={styles.title}>Jordan -- hga:{highGoalA}, lga:{lowGoalA}, hgo:{highGoalO}, lgo:{lowGoalO}</Text>
      <StatusBar style="auto" />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View>
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
              <Button title="save as png" onPress={e => setPopup(!popup)}/>
            </View>
          </Modal>
        </View>
        <View style={styles.scrollContent}>
          <View style={styles.containCounter}>
            <Counter title="High Goal Auto" set={setHighGoalA}/>
            <Counter title="Low Goal Auto" set={setLowGoalA}/>
            <Counter title="High Goal Op" set={setHighGoalO}/>
            <Counter title="Low Goal Op" set={setLowGoalO}/>
          </View>
          <View style={styles.ContainNotes}>
            <TextInput
              keyboardType='numeric'
              style={styles.team}
              onChangeText={setTeam}
              value={team}
              placeholder="Team Number..."
            />
            <TextInput
              multiline
              style={styles.notes}
              onChangeText={setNotes}
              value={notes}
              placeholder="Extra Notes..."
            />
            <Button title="gen QR code" onPress={e => QR(team, highGoalA, lowGoalA, highGoalO, lowGoalO, notes)}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#0f172a',
    width: '100%',
    height: '200%'
  },
  scrollContent: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    color: 'white',
    textAlign: 'center'
  },
  containCounter: {
    width: '45%',
    height: '100%'
  },
  ContainNotes: {
    marginLeft: '5%',
    width: '45%',
    height: '100%',
  },
  notes: {
    color: '#fff',
    marginTop: '2%',
    padding: 10,
    width: '90%',
    height: '50%',
    borderWidth: 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: '#333',
    backgroundColor: '#222',
    marginBottom: '10%'
  },
  team: {
    color: '#fff',
    marginTop: '10%',
    padding: 10,
    width: '90%',
    height: '16%',
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
