import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {colors} from "../styles/globalStyles";
import * as Location from "expo-location";
import {StatusBar} from "expo-status-bar";
import {useCallback, useEffect, useMemo, useState} from "react";

const Weather = () => {
  const [city, setCity] = useState('loading....');
  const [days, setDays] = useState([]);
  const [site, setSite] = useState({ lat: 0, lon: 0});
  const [ok, setOk] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const weatherAPIURI = useMemo(() =>
    `${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${site.lat},${site.lon}&days=1&lang=ko`, [site]);

  const getPermissions = useCallback(async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);

    const { coords: { longitude, latitude }} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const [{ city: currCity }] = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(currCity);
    setSite({ lat: latitude, lon: longitude });
  }, []);

  const getWeatherForecastDuring2Weeks = useCallback(async() => {
    const data = await fetch(weatherAPIURI);
    const res = await data.json();

  }, []);

  useEffect(() => {
    // getPermissions().then(() => getWeatherForecastDuring2Weeks());
    // getPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: `200`, color: 'white' }}>{city}</Text>
        <View style={styles.avgWeather}>
          <Text style={{ fontSize: 30, fontWeight: '100' }}>{}</Text>
        </View>
      </View>
      <ScrollView style={styles.main}>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 20,
  },
  avgWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  main: {
    flex: 4,
  }
});

export default Weather;