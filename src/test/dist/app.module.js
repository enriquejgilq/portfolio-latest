"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const documents_module_1 = require("./entities/documents/documents.module");
const citytype_module_1 = require("./entities/citytype/citytype.module");
const services_module_1 = require("./entities/services/services.module");
const trips_module_1 = require("./entities/trips/trips.module");
const pricingrules_module_1 = require("./entities/pricingrules/pricingrules.module");
const users_module_1 = require("./entities/users/users.module");
const truck_module_1 = require("./entities/trucks/registerTrucks/truck.module");
const truck_type_module_1 = require("./entities/trucks/type/truck-type.module");
const truck_brand_module_1 = require("./entities/trucks/brand/truck-brand.module");
const truck_model_module_1 = require("./entities/trucks/modelo/truck-model.module");
console.log('HOLAAAAAAAAAAA');
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('BD_MONGO_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'src/static'),
                serveRoot: '/static',
            }),
            documents_module_1.DocumentsModule,
            citytype_module_1.CitytypeModule,
            services_module_1.ServicesModule,
            trips_module_1.TripsModule,
            pricingrules_module_1.PricingrulesModule,
            users_module_1.UsersModule,
            truck_module_1.TruckModule,
            truck_type_module_1.TruckTypeModule,
            truck_brand_module_1.TruckBrandModule,
            truck_model_module_1.TruckModelModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map