import dayjs from "dayjs";

const PUBLIC_API_WEATHER_KEY = '8d4f3ca7f47eef91feec3e1b1acfb56d';
const inWeatherDateTime = (weatherDateTime, dateTime) => new Date(weatherDateTime).getTime() >= dateTime.getTime();

export default class WeatherForecastAPI {
  
  async get(city, dateTime) {
    if (!city || !dateTime) return ''
    const apiKey = process.env.PUBLIC_API_WEATHER_KEY || PUBLIC_API_WEATHER_KEY;
 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=16&APPID=${apiKey}`);
    const data = await response.json();
    const item = data.list.find((item) => inWeatherDateTime(item.dt_txt, dateTime));
    const info = item ? item.weather[0] : {};
    return {
        icon: info.icon,
        description: info.description
    };
}







      
      

  processResult(payload, city, dateTime) {
      if (payload.cod !== "200") return this.parseError(payload)

      const date = dayjs(dateTime).format("YYYY-MM-DD")
      const hasCache = this.hasCache(city, date)

      if (!hasCache) this.addCache(city, payload)
      const cacheValue = this.getCache(city)
      return this.getWeather(cacheValue.data, dateTime)
  }
}