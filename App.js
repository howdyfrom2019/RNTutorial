import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {colors, height, width} from "./styles/globalStyles";
import {useCallback, useEffect, useState} from "react";
import * as Location from 'expo-location';

export default function App() {
  const [city, setCity] = useState('loading....');
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const getPermissions = useCallback(async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);

    const { coords: { longitude, latitude }} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const [{ city: currCity }] = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(currCity);
  }, []);

  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 4 }}>
            <View style={styles.city}>
              <Text style={{ color: 'white', textTransform: 'uppercase', fontSize: 24, letterSpacing: 4 }}>{city}</Text>
            </View>
            <Text style={styles.temperature}>19º</Text>
          </View>
          <View style={{ flex: 1, transform: [{ rotate: '-90deg' }, { translateY: 100 }] }}>
            <Text style={{ flex: 1, color: 'white', flexWrap: 'nowrap' }}>it's sunny.</Text>
          </View>
        </View>
      </View>
      <View style={styles.main}>

      </View>
      <StatusBar style={'light'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  header: {
    flex: 1
  },
  main: {
    flex: 2,
    backgroundColor: colors.lolYellow
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  temperature: {
    fontWeight: 'bold',
    fontSize: 120,
    color: 'white'
  }
});