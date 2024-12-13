const request = require("postman-request");

const geoCode = (addy, callback) => {
    const geoUrl = "https://api.mapbox.com/search/geocode/v6/forward?q=" + encodeURIComponent(addy) + "&access_token=pk.eyJ1IjoiamFuYXlhYnJvd24iLCJhIjoiY200ZWRvbXYzMHducDJrcHZlODI2Nnk4dCJ9.UWKdX2L5UOqzhe8yaZpP8w&limit=1"
    request({url:geoUrl, json:true}, (e, res) => {
        if (e) {
            callback("Unable to connect to internet server");
        } else if (res.body.features[0] === undefined) {
            callback("Unable to find location. Please try again.")
        } else {
            const fullAddy = res.body.features[0].properties.full_address;
            const latitude = res.body.features[0].geometry.coordinates[1];
            const longitude = res.body.features[0].geometry.coordinates[0];

            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                fullAddress: fullAddy
                }
            )
        }
    })
}


module.exports = geoCode;