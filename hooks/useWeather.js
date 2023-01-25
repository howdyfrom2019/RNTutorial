import {useCallback, useEffect, useState} from "react";
import {makeKoreanDateStyle} from "../utils/commonUtils";

const useWeather = (current, weather) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getCurrentWeatherState = useCallback((current) => {
    const { temp_c, condition, feelslike_c, humidity, uv, last_updated } = current;
    const { icon, text } = condition;

    setWeatherInfo((prev) => (
      {
        ...prev,
        current: {
          temperature: temp_c,
          condition: text,
          icon: icon,
          feelingTemperature: feelslike_c,
          humidity,
          uv,
          date: makeKoreanDateStyle(last_updated)
        }
      }
    ));
  }, []);

  const getWeatherTodayForecast = useCallback((weather) => {
    const { forecastday } = weather;

    const filteredForecastDays = forecastday.map((item) => {
      const { astro, date, day, hour } = item;
      const { sunrise, sunset } = astro;
      const { avghumidity, avgtemp_c, condition } = day;
      const { text: dayText, icon: dayIcon } = condition;

      const filteredHour = hour.map((prev) => {
        const { humidity, temp_c, condition: hourCond, time: hourTime } = prev;
        const { text, icon } = hourCond;
        return {
          temperature: temp_c,
          condition: text,
          icon: icon,
          humidity,
          date: makeKoreanDateStyle(hourTime)
        }
      });
      return (
        {
          sunrise,
          sunset,
          date: makeKoreanDateStyle(date),
          day: {
            humidity: avghumidity,
            temperature: avgtemp_c,
            condition: dayText,
            icon: dayIcon,
          },
          hour: filteredHour
        }
      )
    });

    setWeatherInfo((prev) => (
      {
        ...prev,
        forecast: filteredForecastDays
      }
    ))
  }, []);

  useEffect(() => {
    if (current === null || weather === null) return;
    getCurrentWeatherState(current);
    getWeatherTodayForecast(weather);
  }, [current, weather]);

  return [weatherInfo];
}

export default useWeather;