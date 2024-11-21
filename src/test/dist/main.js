"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const mongoose = require("mongoose");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const BD_MONGO_URL = configService.get('BD_MONGO_URL');
    await mongoose.connect(BD_MONGO_URL);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    const PORT = configService.get('PORT') ?? 3001;
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors(corsOptions);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('App User')
        .setDescription('')
        .setVersion('1.0')
        .addTag('')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map