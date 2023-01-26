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
    setSite({ lat: latitude, lon: longitude });
    setCity(currCity);
  }, []);

  const getWeatherForecastDuringWeek = useCallback(async() => {
    try {
      const data = await fetch(weatherAPIURI);
      const { current, forecast } = await data.json();
      setWeatherInfo({ current, forecast });
    } catch (e) {
      console.log(e);
    }
  }, [site]);

  const isEveryAPICalled = useCallback(() => {
    return ok && weather && weather.current && weather.forecast;
  }, [ok, weather]);

  useEffect(() => {
    // if (site.lat > 0 && !isEveryAPICalled()) {
      getPermissions();
    // }
  }, []);

  useEffect(() => {
    getWeatherForecastDuringWeek();
  }, [city]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: `200` }}>{city}</Text>
        {isEveryAPICalled() ? (
          <View style={styles.avgWeather}>
            <Text style={{ fontSize: 30, fontWeight: '100', color: colors.label }}>{weather.current.temperature}℃</Text>
            <Text style={{ fontSize: 16, fontWeight: '200', color: colors.label }}>체감온도: {weather.current.feelingTemperature}℃</Text>
            <Image source={{ uri: weather.current.icon }} style={{ width: 74, height: 74 }} />
          </View>
        ) : (
          <ActivityIndicator size={'large'} color={'white'} />
        )}
      </View>
      <View style={styles.main}>
        {
          isEveryAPICalled() && (
            <ScrollView>
              <ScrollView style={styles.todaysWeatherContainer} horizontal showsHorizontalScrollIndicator={false}>
                {
                  weather.forecast[0].hour.map((weatherToday, i) => (
                    <View style={styles.weatherItem} key={`weather_${i}`}>
                      <Text style={{ color: colors.label, fontSize: 10 }}>{extractHour(weatherToday.date)}</Text>
                      <Image source={{ uri: weatherToday.icon }} style={{ width: 32, height: 32 }} />
                      <Text style={{ color: colors.label, fontWeight: '200', fontSize: 12 }}>{weatherToday.temperature}℃</Text>
                      <Text style={{ color: colors.label, fontWeight: '100', fontSize: 10 }}>{'\n'}{weatherToday.humidity}%</Text>
                    </View>
                  ))
                }
              </ScrollView>
              <View style={styles.etcWeatherContainer}>
                <View style={styles.etcItem}>
                  <Text style={{ fontSize: 16, color: colors.label, fontWeight: '200' }}>일출</Text>
                  <Text style={{ fontSize: 20, color: colors.label, fontWeight: '400' }}>{weather.forecast[0].sunrise}</Text>
                </View>
                <View style={styles.etcItem}>
                  <Text style={{ fontSize: 16, color: colors.label, fontWeight: '200' }}>일몰</Text>
                  <Text style={{ fontSize: 20, color: colors.label, fontWeight: '400' }}>{weather.forecast[0].sunset}</Text>
                </View>
              </View>
              <View style={styles.etcWeatherContainer}>
                <View style={styles.etcItem}>
                  <Text style={{ fontSize: 16, color: colors.label, fontWeight: '200' }}>자외선지수</Text>
                  <Text style={{ fontSize: 12, color: colors.label, fontWeight: '400' }}>{weather.current.uv}</Text>
                </View>
                <View style={styles.etcItem}>
                  <Text style={{ fontSize: 16, color: colors.label, fontWeight: '200' }}>습도</Text>
                  <Text style={{ fontSize: 20, color: colors.label, fontWeight: '400' }}>{weather.current.humidity}%</Text>
                </View>
                <View style={styles.etcItem}>
                  <Text style={{ fontSize: 16, color: colors.label, fontWeight: '200' }}>습도</Text>
                  <Text style={{ fontSize: 20, color: colors.label, fontWeight: '400' }}>{weather.current.humidity}%</Text>
                </View>
              </View>
            </ScrollView>
          )
        }
      </View>
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
    paddingHorizontal: 8,
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
  },
  etcWeatherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: colors.whiteAlpha,
    borderColor: colors.white,
    borderRadius: 20,
  },
  etcItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Weather;