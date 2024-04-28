import { Component } from "react";

const apiKey = "0e5ba5dd564801b6794bef2b4a17bc22"




const myImages = {
    Clouds:"./images/cloudy.jpeg",
    Rain:"./images/rain.webp",
    Snow:"./images/snow.webp",
    Clear:"./images/clear.webp"
}

class Weather extends Component {
     getWeatherReport = async (lat , long) => {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
            const result = await response.json();
            this.setState(result);
            console.log(result);

        }
        catch(error){
            alert(error);
        }

     }


     getMyWeather = async ()=>{
        navigator.geolocation.getCurrentPosition((position) =>{
            const{latitude , longitude} = position.coords;

            this.getWeatherReport(latitude , longitude);

        }, (err)=>{
            alert("unable to access your location")
        })
     }

     


    render(){

        const getCoords = (event)=>{
            event.preventDefault();
            const lat = event.target["lat"].value;
            const long = event.target["long"].value;
            this.getWeatherReport(lat, long);
        }



        const weatherType = this.state?.weather?.[0]?.main;
        const city = this.state?.name;
        const temp = this.state?.main?.temp - 273.15;
        const windSpeed = this.state?.wind?.speed;
        
        console.log(weatherType , city , temp ,windSpeed);

        return(
            <div id="app-container">
                <div className="input-section">
                    <form onSubmit={getCoords}>
                        <input 
                            type="text"
                            placeholder="lattitude"
                            name="lat"
                            required
                        />
                        <input 
                            type="text"
                            placeholder="longitude"
                            name="long"
                            required
                        />
                        <button>Get Weather Report</button>
                        <button onClick={this.getMyWeather}>Get My Weather Report</button>
    
                    </form>
                </div>
                {
                    this.state && (
                        <div className="report">
                            <img src={myImages[weatherType]}/>
                            <p>Temprature:<b>{temp}</b></p>
                            <p>Wind Speed:<b>{windSpeed}</b></p>
                            <p>City:<b>{city}</b></p>
                                            
                </div>
                    )
                }
                
    
    
    
            </div>
        )
    }
}

export default Weather;