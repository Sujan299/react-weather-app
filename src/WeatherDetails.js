import React from 'react'


export default function WeatherDetails(props){
    return(
        <div className='data'>
        <h3>Real Time tempreture & humidity: </h3>
        <div className='temp'>
            <p>Tempreture = {props.temp[0]} °Celcius</p>
        </div>
        <div className='temp_max'>
            <p>Maximum Tempreture = {props.temp[1]} °Celcius</p>
        </div>
        <div className='temp_min'>
            <p>Minimum tempreture = {props.temp[2]} °Celcius</p>
        </div>
        <div className='humidity'>
            <p>Humidity = {props.temp[3]}</p>
        </div>
        </div>
        
    )
}