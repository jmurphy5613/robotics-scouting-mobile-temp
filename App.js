import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'; 
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import Counter from './components/counter';

async function changeOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}


export default function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [highGoalA, setHighGoalA] = useState(0);
  const [highGoalO, setHighGoalO] = useState(0);
  const [lowGoalA, setLowGoalA] = useState(0);
  const [lowGoalO, setLowGoalO] = useState(0);

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
      <ScrollView>
        <View style={styles.containCounter}>
          <Counter title="High Goal Auto" set={setHighGoalA}/>
          <Counter title="Low Goal Auto" set={setLowGoalA}/>
          <Counter title="High Goal Op" set={setHighGoalO}/>
          <Counter title="Low Goal Op" set={setLowGoalO}/>
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
  title: {
    color: 'white',
    textAlign: 'center'
  },
  containCounter: {
    width: '45%',
    height: '100%'
  }
});
