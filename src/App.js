import React from "react";
import axios from "axios";




const City = (props) => {

  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.temperature}°C</td>
      <td>{props.weather}</td>
    </tr>
  );
}

const Cities = (props) => {

  const cities = props.cities.map((city)=> {

        return (<City title={city.title} 
          temperature={city.temperature}
          weather={city.weather} />)
  });

  return (
    <table>
      {cities}
    </table>
  )
}

class App extends React.Component {

  state = { 
    cities :[
    {title: "London", temperature: "NA", weather: "NA" },
    {title: "Manchester", temperature: "NA", weather: "NA"},
    {title: "Bristol", temperature: "NA", weather: "NA"},
    {title: "Liverpool", temperature: "NA", weather: "NA"},
    {title: "Bristol", temperature: "NA", weather: "NA"},
    {title: "Leeds", temperature: "NA", weather: "NA"},
    {title: "Glasgow", temperature: "NA", weather: "NA"},
    {title: "Oxford", temperature: "NA", weather: "NA"},
    {title: "Edinburgh", temperature: "NA", weather: "NA"},
    {title: "Cambridge", temperature: "NA", weather: "NA"}
    ]
  };

  componentDidMount(){

    const weather_api = "https://api.weatherapi.com/v1/current.json?key="+"7ce21f6a45c048f182394213221608&aqi=no";
    
    var weather_api_calls = [];

  

    for(var city in this.state.cities){
      
      weather_api_calls.push(axios.get(weather_api+"&q="+this.state.cities[city].title));

    }

    axios.all(weather_api_calls).then(axios.spread((...res) => {

      var cities = [];

        for( var r in res){

          var city = {};
          city["title"] = res[r].data.location.name;
          city["temperature"] = res[r].data.current.temp_c;
          city["weather"] = res[r].data.current.condition.text;
          cities.push(city);

        }

        this.setState({ "cities" : cities});

    }))
    
    
    
  }

  render(){ 
  return (
    <div className="App">
      <h1>Weather App</h1>
      <br/>
      <Cities cities={this.state.cities} />
    </div>
  );
  }
}

export default App;

/*

User/Design Goals:
User enters a city from UK
API fetches distance data of that city for 10 cities
API fetches weather data for those 10 cities
Sort list based on a score
Display List

Architecture:
Model:
List of Cities

API:
Distance
Weather

Algorithm/Data Structure:
Scoring Module

View:
Sort & List


*/
