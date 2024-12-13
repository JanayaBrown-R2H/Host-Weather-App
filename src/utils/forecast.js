const request = require("postman-request");

const forecast = function (latitude, longitude, callback) {
    const URL = "https://api.weatherstack.com/current?access_key=b769060be209fb26aa976443c527c5ad&query=" + latitude + "," + longitude + "&units=f";
    //console.log(URL);
    request({url:URL, json:true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather service", undefined);
        } else if (response.body.error) {
            callback(`ERROR! Code ${response.body.error.code}: ${response.body.error.info}`, undefined);
        } else {
            const data = response.body.current;
            callback(undefined, `It is currently ${data.temperature} degrees out with ${data.weather_descriptions[0].toLowerCase()} skies.`)
        }
    })
}


module.exports = forecast;