"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countStopsTypes = exports.getStops = void 0;
const config_1 = require("../../../../services/config");
function getStops(body) {
    let stops = [];
    if (!('stops_address' in body) || !body.stops_address.length)
        return stops;
    const destinationLatitude = Number(body.destination_latitude);
    const destinationLongitude = Number(body.destination_longitude);
    const lastStop = body.stops_address[body.stops_address.length - 1];
    stops = body.stops_address;
    if (Number(lastStop.location[0]) === destinationLatitude &&
        Number(lastStop.location[1]) === destinationLongitude) {
        stops = body.stops_address.slice(0, body.stops_address.length - 1);
    }
    return stops;
}
exports.getStops = getStops;
function countStopsTypes({ legs, optimize }) {
    const settings = config_1.settingsService.getSettingsData();
    const threshold = settings.stop_threshold * 1000;
    const lastLeg = legs[legs.length - 1];
    const shiftRemove = optimize && !lastLeg.distance.value ? 2 : 1;
    const stopsLegs = legs.slice(0, legs.length - shiftRemove);
    const stopsTypes = stopsLegs.reduce((acc, leg) => {
        if (!leg?.distance?.value)
            return acc;
        if (leg.distance.value >= threshold) {
            acc.outside += 1;
        }
        else {
            acc.inside += 1;
        }
        return acc;
    }, { inside: 0, outside: 0 });
    return stopsTypes;
}
exports.countStopsTypes = countStopsTypes;
//# sourceMappingURL=getStops.js.map