import React from 'react'
import WeatherDetails from './WeatherDetails'
import './css/main.scss'
import { useState } from 'react'
const api = {
  key: '1274c6671e477cabe3ccfe947760c57b',
  base: 'https://api.openweathermap.org/data/2.5/',
  baseByGeo: 'http://api.openweathermap.org/geo/1.0/'
}
//   http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

async function searchedCity(city) {
  const result = await fetch(`${api.baseByGeo}direct?q=${city}&appid=${api.key}`);
  // console.log(result)
  const data = await result.json();
  console.log(data)
  const lat = data[0].lat;
  console.log(lat);
  const lon = data[0].lon;
  console.log(lon);
  // stuck here for 4 hours because after appid I have written {api.base} instead of {api.key}
  const fResult = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`)
  const data1 = await fResult.json();
  function KelvintoCelcius(kelvinData){
    return kelvinData-273.15;
  }
  // console.log(data1);
  // console.log(data1.main.temp)
  const tempInKelvin = data1.main.temp;
  const tempInCelcius = KelvintoCelcius(tempInKelvin);
  const MaxTempInKelvin = data1.main.temp_max;
  const MaxTempInCelcius = KelvintoCelcius(MaxTempInKelvin);
  const MinTempInKelvin = data1.main.temp_min;
  const MinTempInCelcius = KelvintoCelcius(MinTempInKelvin);
  const Humidity = data1.main.humidity;
  const dataToRender =[tempInCelcius, MaxTempInCelcius, MinTempInCelcius, Humidity];
  // console.log(dataToRender)
  return dataToRender;
  // console.log(temCelcius)
}

export default function App() {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState('');
  const [max_temp, setMax_temp] = useState('');
  const [min_temp, setMin_temp] = useState();
  const [humidity, setHumidity] = useState();
  return (
    <>
      <nav>
        <input type='search' placeholder='City Name' onChange={(e) => {
          // e.target.value
          // console.log(e.target.value)
          setCity(e.target.value)
        }} />
        <span><button onClick={async () => {
          const temp = await searchedCity(city);
          setTemp(temp[0]);
          // console.log(temp)
          setMax_temp(temp[1]);
          // console.log(max_temp)
          setMin_temp(temp[2]);
          setHumidity(temp[3]);
        }}>Search</button></span>
      </nav>
      
      <WeatherDetails temp={[Math.round(temp), Math.round(max_temp), Math.round(min_temp), Math.round(humidity)]}/>
    </>
  )
}