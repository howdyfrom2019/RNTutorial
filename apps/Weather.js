import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {colors} from "../styles/globalStyles";
import * as Location from "expo-location";
import {StatusBar} from "expo-status-bar";
import {useCallback, useEffect, useMemo, useState} from "react";
import {extractHour, makeTimeStampToCustomDate} from "../utils/commonUtils";
import useWeather from "../hooks/useWeather";

const Weather = () => {
  const [city, setCity] = useState('loading....');
  const [site, setSite] = useState({ lat: 0, lon: 0 });
  const [ok, setOk] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState({ current: null, forecast: null });
  const [weather] = useWeather(weatherInfo.current, weatherInfo.forecast);
  const weatherAPIURI = useMemo(() =>
    `${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${site.lat},${site.lon}&days=7&lang=ko`, [site]);

  const getPermissions = useCallback(async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);

    const { coords: { longitude, latitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const [{ city: currCity }] = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(currCity);
    setSite({ lat: latitude, lon: longitude });
  }, []);

  const getWeatherForecastDuringWeek = useCallback(async() => {
    const data = await fetch(weatherAPIURI);
    const { current, forecast } = await data.json();
    setWeatherInfo({ current, forecast });
  }, []);

  const isEveryAPICalled = useCallback(() => {
    return ok && weather && weather.current && weather.forecast;
  }, [ok, weather]);

  useEffect(() => {
    // if (site.lat > 0 && !isEveryAPICalled()) {
      getPermissions().then(() => getWeatherForecastDuringWeek());
    // }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: `200`, color: 'white' }}>{city}</Text>
        {isEveryAPICalled() ? (
          <View style={styles.avgWeather}>
            <Text style={{ fontSize: 30, fontWeight: '100', color: colors.white }}>{weather.current.temperature}℃</Text>
            <Text style={{ fontSize: 16, fontWeight: '200', color: colors.white }}>체감온도: {weather.current.feelingTemperature}℃</Text>
            <Image source={{ uri: weather.current.icon }} style={{ width: 74, height: 74 }} />
          </View>
        ) : (
          <ActivityIndicator size={'large'} color={'white'} />
        )}
      </View>
      <ScrollView style={styles.main}>
        {
          isEveryAPICalled() && (
            <ScrollView style={styles.todaysWeatherContainer} horizontal showsHorizontalScrollIndicator={false}>
              {
                weather.forecast[0].hour.map((weatherToday, i) => (
                  <View style={styles.weatherItem} key={`weather_${i}`}>
                    <Text style={{ color: colors.white, fontSize: 10 }}>{extractHour(weatherToday.date)}</Text>
                    <Image source={{ uri: weatherToday.icon }} style={{ width: 32, height: 32 }} />
                    <Text style={{ color: colors.white, fontWeight: '200', fontSize: 12 }}>{weatherToday.temperature}℃</Text>
                    <Text style={{ color: colors.white, fontWeight: '100', fontSize: 10 }}>{'\n'}{weatherToday.humidity}%</Text>
                  </View>
                ))
              }
            </ScrollView>
          )
        }
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  main: {
    flex: 4,
  },
  todaysWeatherContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors.whiteAlpha,
    borderColor: colors.white,
  },
  weatherItem: {
    width: 64,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 12,
  }
});

export default Weather;