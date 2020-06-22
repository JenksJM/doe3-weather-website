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
            const weatherIcon = data.weather_icons[0];
            const iconDetail = '<img src="'+weatherIcon+'">';
            callback(undefined, "<b>" + weatherDescriptions + "</b>" + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out<br>' + iconDetail);
        }
    });
}

module.exports = forecast