import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {colors} from "../styles/globalStyles";
import * as Location from "expo-location";
import {StatusBar} from "expo-status-bar";
import {useCallback, useEffect, useState} from "react";

const WEATHER_API_KEY = '5095753db95c521d926f098c2d501f98';

const Weather = () => {
  const [city, setCity] = useState('loading....');
  const [days, setDays] = useState([]);
  const [site, setSite] = useState({ lat: 0, lon: 0});
  const [ok, setOk] = useState(true);

  const getPermissions = useCallback(async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);

    const { coords: { longitude, latitude }} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const [{ city: currCity }] = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(currCity);
    setSite({ lat: latitude, lon: longitude });
  }, []);

  const getWeather = useCallback(async() => {
    try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${site.lat}&lon=${site.lon}&cnt=${14}&appid=${WEATHER_API_KEY}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
      const res = await data.json();
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  }, [site]);

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    const { lat, lon } = site;
    if (lat === 0 || lon === 0) return;
    getWeather();
  }, [site]);

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
        <ActivityIndicator color={'white'} style={{ marginTop: 10}} size={'large'} />
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

export default Weather;