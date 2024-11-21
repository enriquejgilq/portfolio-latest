"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckSchema = exports.Truck = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Dimension = class Dimension {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dimension.prototype, "lengthCava", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dimension.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dimension.prototype, "heightCava", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dimension.prototype, "lengthPlatform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dimension.prototype, "heightPlatform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dimension.prototype, "cubicMeters", void 0);
Dimension = __decorate([
    (0, mongoose_1.Schema)()
], Dimension);
let VehicleState = class VehicleState {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['20%', '50%', '80% or more'] }),
    __metadata("design:type", String)
], VehicleState.prototype, "tires", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "windshield", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "mirrors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "frontLights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "rearLights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "brakeLights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "signalLights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "holesInCava", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleState.prototype, "doors", void 0);
VehicleState = __decorate([
    (0, mongoose_1.Schema)()
], VehicleState);
class VehicleAccessories {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "extinguisher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "hydraulicJack", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "Pussy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "padlock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "rubberKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "spareRubber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "toolBox", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "waxed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "chacas", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "ropes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "chains", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], VehicleAccessories.prototype, "cinchas", void 0);
class DocumentDto {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DocumentDto.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], DocumentDto.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DocumentDto.prototype, "url", void 0);
class PermisoDto {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PermisoDto.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], PermisoDto.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PermisoDto.prototype, "url", void 0);
let Truck = class Truck extends mongoose_2.Document {
};
exports.Truck = Truck;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Truck.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Truck.prototype, "typeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Truck.prototype, "brandId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Truck.prototype, "modelId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Truck.prototype, "plate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Truck.prototype, "temperature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Truck.prototype, "capacityPallets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Truck.prototype, "capacityKilos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Truck.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Truck.prototype, "deletionReason", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Truck.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Dimension], required: true }),
    __metadata("design:type", Array)
], Truck.prototype, "dimensions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [VehicleState], required: true }),
    __metadata("design:type", Array)
], Truck.prototype, "vehicleState", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [VehicleAccessories], required: true }),
    __metadata("design:type", Array)
], Truck.prototype, "vehicleAccessories", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: {
                    type: String,
                    enum: [
                        'insurance_policy',
                        'health_registration',
                        'origin_certification',
                        'circulation_license',
                    ],
                    required: true,
                },
                url: { type: String, required: true },
                expirationDate: { type: Date, required: true },
            },
        ],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
    }),
    __metadata("design:type", Array)
], Truck.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: {
                    type: String,
                    enum: ['ROCT', 'ISOpesca', 'RACDA', 'RESQUIN'],
                    required: true,
                },
                url: { type: String, required: true },
                expirationDate: { type: Date, required: true },
            },
        ],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
    }),
    __metadata("design:type", Array)
], Truck.prototype, "permisos", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: {
                    type: String,
                    enum: ['frontal', 'later', 'side1', 'side2'],
                    required: true,
                },
                url: { type: String, required: true },
            },
        ],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
    }),
    __metadata("design:type", Array)
], Truck.prototype, "photo", void 0);
exports.Truck = Truck = __decorate([
    (0, mongoose_1.Schema)()
], Truck);
function arrayLimit(val) {
    return val.length <= 4;
}
exports.TruckSchema = mongoose_1.SchemaFactory.createForClass(Truck);
//# sourceMappingURL=Truck.schema.js.map