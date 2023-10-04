const request= require('request');
const weather=(latitude, longitude, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=146f699ce8ec5369b0596c2a8ac9e527&query='+latitude+','+longitude+'&units=m';
    request({url: url, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect to weather service', undefined);
        }
        else if(response.body.error){
            callback('unable to find location', undefined);
        }
        else{
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                location: response.body.location.name,
                weatherdesc: response.body.current.weather_descriptions[0],
                windspeed: response.body.current.wind_speed,
                humidity: response.body.current.humidity,
                locname: response.body.location.name,
                locregion: response.body.location.region,
                loccountry: response.body.location.country
            });
        }
    });
}

module.exports= weather;