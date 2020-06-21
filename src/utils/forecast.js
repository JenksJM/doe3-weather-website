const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=84973c93a4633756b08bbd8f5a7461b4&query='+latitude+','+longitude;
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error){
            callback('Unable to find Location', undefined);
        }
        else{        
            const data = body.current;
            const temperature = data.temperature;
            const feelsLike = data.feelslike;
            const weatherDescriptions = data.weather_descriptions[0];
            callback(undefined, weatherDescriptions + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out');
        }
    });
}

module.exports = forecast