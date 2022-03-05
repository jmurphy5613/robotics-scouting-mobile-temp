import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'; 
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import Counter from './components/counter';
import { TextInput } from 'react-native';

async function changeOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}

let jsonData;

const QR = () => {
  let raw = {
    'teamId': team,
    'hga': highGoalA,
    'lga': lowGoalA,
    'hgo': highGoalO,
    'lgo': lowGoalO,
    'notes': notes
  } //not sure how well notes is gonna work, might but out and die if you put ", ', or like {}.
  jsonData = JSON.stringify(raw);
}

export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [highGoalA, setHighGoalA] = useState(0);
  const [highGoalO, setHighGoalO] = useState(0);
  const [lowGoalA, setLowGoalA] = useState(0);
  const [lowGoalO, setLowGoalO] = useState(0);
  const [notes, setNotes] = useState(null);
  const [team, setTeam] = useState(null);

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

  return (
    <View style={styles.mainContent}>
      
      <Text style={styles.title}>Jordan -- hga:{highGoalA}, lga:{lowGoalA}, hgo:{highGoalO}, lgo:{lowGoalO}</Text>
      <StatusBar style="auto" />
      <ScrollView keyboardShouldPersistTaps='handled'>
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
            {/*put this thing as the modal trigger or something. right now, it just generates the json data. nothing else.*/}
            <Button title="gen QR code" onPress={e => QR}/>
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
    height: '100%'
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
});
