const request = require("postman-request");

const geocode = function (address, callback) {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibmF2YWxiaWhhbmkzIiwiYSI6ImNrcWdkczdiNDFlY2Qyb256MDd4b3JzcmQifQ.9l5SEhR9GrTCrGaC4t18Sw`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to Location Services!!!", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to Find Location!!!!", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
