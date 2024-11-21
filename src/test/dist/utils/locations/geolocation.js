"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geolocation = void 0;
const geolib_1 = require("geolib");
class Geolocation {
    isPointInsidePolygon(point, polygon) {
        const isInside = (0, geolib_1.isPointInPolygon)(point, polygon);
        if (!isInside) {
            return true;
        }
        return false;
    }
    findZoneByPoint(listData, point) {
        return listData.find((zone) => {
            const isInside = this.isPointInsidePolygon(point, zone.kmlzone);
            return isInside;
        });
    }
}
exports.geolocation = new Geolocation();
//# sourceMappingURL=geolocation.js.map