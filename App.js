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

const TextUpdateHandler = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
    />
  );
}


export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [highGoalA, setHighGoalA] = useState(0);
  const [highGoalO, setHighGoalO] = useState(0);
  const [lowGoalA, setLowGoalA] = useState(0);
  const [lowGoalO, setLowGoalO] = useState(0);
  const [notes, setNotes] = useState(null);

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
              multiline
              style={styles.notes}
              onChangeText={setNotes}
              value={notes}
              placeholder="put your notes here..."
            />
            <Button title="gen QR code"/>
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
    marginTop: '10%',
    padding: 10,
    width: '90%',
    height: '60%',
    borderWidth: 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: '#333',
    backgroundColor: '#222',
    marginBottom: '11%'
  },
});
