"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const validation_exception_1 = require("./encurtador/exceptions/validation.exception");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => new validation_exception_1.ValidationException(errors),
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Shortner NP')
        .setDescription('A URL Shortener')
        .setVersion('1.0')
        .addTag('shortener')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(process.env.PORT || 8081);
}
bootstrap();
//# sourceMappingURL=main.js.map