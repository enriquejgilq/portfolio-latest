"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesPickDest = void 0;
const constants_1 = require("../../../../constants/constants");
function getCoordinatesPickDest({ courierFlowType, destinationCoordinates, originCoordinates, }) {
    const coordinatesMap = {
        [constants_1.constants.COURIER_CISTERNA_FLOW]: () => ({
            lat: destinationCoordinates.latitude,
            lng: destinationCoordinates.longitude,
        }),
        [constants_1.constants.COURIER_ESCOMBRO_FLOW]: () => ({
            lat: originCoordinates.latitude,
            lng: originCoordinates.longitude,
        }),
    };
    return (coordinatesMap[courierFlowType] || (() => ({ lat: 0, lng: 0 })))();
}
exports.getCoordinatesPickDest = getCoordinatesPickDest;
//# sourceMappingURL=getDebrisCisternsCoordinates.js.map