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
      <Text style={styles.title}>Jordan</Text>
      <StatusBar style="auto" />
      <ScrollView>
        <Counter title="High Goal Auto"/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  title: {
    color: 'white'
  }
});
