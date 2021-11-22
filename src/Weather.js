import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"
import WeatherInfo from "./WeatherInfo";



export default function Weather(props){
    let [weatherData, setWeatherData]= useState({ready:false});
    let [city, setCity]= useState (props.defaultCity);
    
   
    function updateWeather(response){
        setWeatherData({
            ready:true,
            city: response.data.name,
            temperature:response.data.main.temp, 
            humidity: response.data.main.humidity,  
            description:response.data.weather[0].description,
            wind:response.data.wind.speed,
            date: new Date(response.data.dt * 1000),
            icon: "https://ssl.gstatic.com/onebox/weather/64/rain_light.png"
        });
        

    }
    function search(){
    const apiKey="094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
    }

    function updateCity(event){
        setCity(event.target.value);
        
    }
    function handleSubmit(event){
        event.preventDefault();
        search();

    }
 if (weatherData.ready){
    return(
        <div className="Weather">
            <form onSubmit= {handleSubmit}>
                <div className="row">
                <div className="col-9">
                <input type="search" placeholder="Enter a city..." className="form-control" 
                autoFocus="on" onChange = {updateCity}/>
                </div>
                <div className="col-3">
                <input type="submit" value="Search"className="btn btn-primary w-100"/>
                </div>
                </div>
            </form>
            <WeatherInfo data={weatherData} />
        </div>
        
    )
}
else {
    search();
    return (
        <p>
            loading...
        </p>
    )

}
}